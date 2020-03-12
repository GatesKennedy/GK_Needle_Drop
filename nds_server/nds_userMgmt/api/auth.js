const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const pool = require('../../../nds_db/db');
const config = require('config');
const { check, validationResult } = require('express-validator');

//  @route      POST api/auth
//  @desc       Test Route
//  @access     PRIVATE
router.get('/', auth, (request, response) => {
  try {
    pool.query(
      'SELECT * FROM tbl_user WHERE id=($1)',
      [request.user.id],
      (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
      }
    );
  } catch (err) {
    console.error(err.mesage);
    response.status(500).send('Server error');
  }
});

//  @route      POST api/auth
//  @desc       Authenticate user & get token
//  @access     PUBLIC
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  (request, response, next) => {
    const errors = validationResult(request);
    const { email, password } = request.body;
    //  Error Response
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //^\\
    console.log('Request Body: ' + request.body);

    try {
      pool.connect((err, client, done) => {
        //  Abort Function
        const shouldAbort = err => {
          if (err) {
            console.error('Error in transaction', err.stack);
            client.query('ROLLBACK', err => {
              if (err) {
                console.error('Error rolling back client', err.stack);
              }
              // release the client back to the pool
              done();
            });
          }
          return !!err;
        };

        //  Check: User Registration
        console.log('Enter Try Block');

        client.query('BEGIN', err => {
          //  Check Connection
          if (shouldAbort(err)) return;

          console.log('Pass shouldAbort()');
          //  Check Email
          const queryText = 'SELECT * FROM tbl_user WHERE email = ($1)';

          const user = client.query(
            queryText,
            [email],
            async (err, res, next) => {
              if (shouldAbort(err)) return;

              let resBody = JSON.stringify(res.rows);
              //const passCrypt = JSON.stringify(res.password);
              console.log('Check Email res: ' + resBody);
              console.log('res: ' + res.rows[2]);
              //console.log(passCrypt);

              //  IF email does not Exist...
              if (!res.rows.length > 0) {
                console.log(res.rows);
                return response
                  .status(400)
                  .json({ errors: [{ msg: 'Invalid Credentials' }] });
              }

              // const isMatch = await bcrypt.compare(password, res.password);

              // if (!isMatch) {
              //   console.log(res.rows);
              //   return response
              //     .status(400)
              //     .json({ errors: [{ msg: 'Invalid Credentials' }] });
              // }

              const userId = res.rows[0].id;
              const payload = {
                user: {
                  id: userId
                }
              };
              //  Return JWT
              jwt.sign(
                payload,
                config.get('auth_config.jwtShhh'),
                { expiresIn: 18000 },
                (err, token) => {
                  if (err) throw err;
                  response.json({ token });
                }
              );

              client.query('COMMIT', err => {
                if (err) {
                  console.error('Error committing transaction', err.stack);
                }
                done();
              });
            }
          );
        });
      });
    } catch (error) {
      console.error(err.mesage);
      response.status(500).send('Server error');
    }
  }
);

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
