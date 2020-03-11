const express = require('express');
const router = express.Router();
const request = require('request');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const pool = require('../../../nds_db/db');
const config = require('config');
const { check, validationResult } = require('express-validator');

//  =============
//  ==   GET   ==
//  =============
//  @route      GET api/user
//  @desc       Display All Users
//  @access     PRIVATE
router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM tbl_user', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

//  @route      GET api/user/:id
//  @desc       Display User by id
//  @access     PRIVATE
router.get('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM tbl_user WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

//  @route      GET api/user/profile/:id
//  @desc       Display User Profile by id
//  @access     PUBLIC
router.get('/user', (request, response, next) => {
  if (request.isAuthenticated()) {
    //  GET User :id for Redirect
    //  REDIRECT to Profile
    response.redirect('/profile/:id');
  } else {
    response.redirect('/auth');
  }
});

//  @route      GET api/user/profile/:id
//  @desc       RETURN User Profile Data
//  @access     PRIVATE
router.get('/profile/:id', (request, response, next) => {
  if (request.isAuthenticated()) {
    // RETURN USER profile data
    response.json('/profile/:id');
  }
});

//  @route      GET api/user/logout
//  @desc       LOGOUT User
//  @access     PRIVATE
router.get('/logout', (request, response, next) => {
  console.log('preLogout: ' + req.isAuthenticated());
  request.logout();
  console.log('postLogout: ' + req.isAuthenticated());
  response.redirect('/');
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST api/auth/login
//  @desc       Login User
//  @access     PUBLIC
router.post(
  '/auth/login',
  passport.authenticate('local', {
    successRedirect: '/profile/:id',
    failureRedirect: '/auth'
  }),
  (request, response, next) => {
    console.log('Login FXN @ user.js');
    if (request.body.remember) {
      request.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
      request.session.cookie.expires = false; // Cookie expires after this session
    }
    response.redirect('/');
  }
);

//  @route      POST api/auth/register
//  @desc       Register User
//  @access     PUBLIC
router.post(
  '/auth/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password: 6 characters min').isLength({ min: 6 })
  ],
  async (request, response, next) => {
    const errors = validationResult(request);
    const { name, email, password } = request.body;
    let body = JSON.stringify(request.body);

    //^\\
    console.log('Request Body: ' + body);

    //  Error Response
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      //  Create Client Instances of Pool
      const client = await pool.connect();
      await client.query('BEGIN');
      var pwd = await bcrypt.hash(request.body.password, 5);
      await JSON.stringify(
        client.query(
          'SELECT id FROM tbl_user WHERE email=$1',
          [request.body.email],
          (err, result) => {
            if (result.rows[0]) {
              console.log('WARN: This email address is already registered');
              response.redirect('/auth/register');
            } else {
              client.query(
                'INSERT INTO tbl_user (name, email, password) VALUES ($1, $2, $3)',
                [request.body.name, request.body.email, pwd],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    client.query('COMMIT');
                    console.log(result);
                    response.redirect('/auth/login');
                    return;
                  }
                }
              );
            }
          }
        )
      );
      client.release();
    } catch (e) {
      throw e;
    }
  }
);

//       pool.connect((err, client, done) => {
//         const shouldAbort = err => {
//           if (err) {
//             console.error('Error in transaction', err.stack);
//             client.query('ROLLBACK', err => {
//               if (err) {
//                 console.error('Error rolling back client', err.stack);
//               }
//               // release the client back to the pool
//               done();
//             });
//           }
//           return !!err;
//         };

//         //  Check: User Registration
//         console.log('Enter Try Block');
//         client.query('BEGIN', err => {
//           if (shouldAbort(err)) return;
//           console.log('Pass shouldAbort()');
//           const queryText = 'SELECT name FROM tbl_user WHERE email = ($1)';
//           client.query(queryText, [email], async (err, res, next) => {
//             if (shouldAbort(err)) return;
//             let resBody = JSON.stringify(res.rows);
//             console.log('Check Name res: ' + resBody);
//             //  IF email already Exists...
//             if (res.rows.length > 0) {
//               console.log(res.rows);
//               return response
//                 .status(400)
//                 .json({ errors: [{ msg: 'User already exists' }] });
//             }
//             console.log('User email is Available');
//             //  Encrypt User Password
//             const salt = await bcrypt.genSalt(10);
//             const pwCrypt = await bcrypt.hash(password, salt);
//             //  Create User (SQL: tbl_user)
//             const insertText =
//               'INSERT INTO tbl_user(name, email, password) VALUES($1, $2, $3) RETURNING id';
//             const insertValues = [name, email, pwCrypt];
//             client.query(insertText, insertValues, (errz, rez) => {
//               if (errz) return next(errz);
//               console.log('Create User Fxn');
//               console.log('New User id: ' + rez.rows[0].id);
//               const userId = rez.rows[0].id;
//               //  Return JWT
//               const payload = {
//                 user: {
//                   id: userId
//                 }
//               };
//               jwt.sign(
//                 payload,
//                 config.get('auth_config.jwtShhh'),
//                 { expiresIn: 18000 },
//                 (err, token) => {
//                   if (err) throw err;
//                   response.json({ token });
//                 }
//               );

//               client.query('COMMIT', err => {
//                 if (err) {
//                   console.error('Error committing transaction', err.stack);
//                 }
//                 done();
//               });
//             });
//           });
//         });
//       });
//     } catch (error) {
//       //console.error(err.mesage);
//       response.status(500).send('Server error');
//     }
//   }
// );

//  =============
//  ==   PUT   ==
//  =============
//  @route      PUT api/user/:id
//  @desc       Edit User (name, email)
//  @access     PRIVATE
router.put('/:id', (request, response, next) => {
  const { name, email } = request.body;
  const { id } = request.params;

  pool.query(
    'UPDATE tbl_user SET name=$1, email=$2 WHERE id=$3)',
    [name, email, id],
    (err, res) => {
      if (err) return next(err);

      response.json(res);
    }
  );
});

//  @route      PUT api/user/shh/:id
//  @desc       Edit User (password)
//  @access     PRIVATE
router.put('/shh/:id', (request, response, next) => {
  const { name, email, password } = request.body;
  const { id } = request.params;

  pool.query('UPDATE tbl_user SET password=$1)', [password], (err, res) => {
    //const { id } = res.body;

    if (err) return next(err);
    let resBody = JSON.stringify(res.body);
    console.log(resBody);
    // % % ERROR % %
    //    pass :id value
    //    const id = res.json(id);
    response.redirect('/api/user/3');
  });
});

//  ==============
//  ==  DELETE  ==
//  ==============
//  @route      DELETE api/user/:id
//  @desc       Delete USER
//  @access     PRIVATE
router.delete('/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('DELETE FROM tbl_user WHERE id=($1)', [id], (err, res) => {
    if (err) return next(err);

    response.json({ msg: 'User Deleted' });
  });
});

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
