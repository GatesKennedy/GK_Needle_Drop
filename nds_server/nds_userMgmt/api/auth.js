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
//  @desc       Authenticate User Token
//  @access     PRIVATE
router.get('/', auth, (request, response) => {
  try {
    pool.query(
      'SELECT id, name, email, date_join FROM tbl_user WHERE id=($1)',
      [request.user.id],
      (err, res) => {
        if (err) return next(err);
        response.json(res.rows);
      }
    );
  } catch (err) {
    console.error('catch: ' + err.mesage);
    response.status(500).send('Server error');
  }
});

//  @route      POST api/auth
//  @desc       LOGIN Auth user & get token
//  @access     PUBLIC
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (request, response, next) => {
    const { email, password } = request.body;
    //  Validation Error Response
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //  Async db Connection
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      //  Check Email exists
      const queryText = 'SELECT * FROM tbl_user WHERE email = ($1)';
      const res = await client.query(queryText, [email]);
      if (!res.rows.length > 0) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //  Check Password
      const isMatch = await bcrypt.compare(password, res.rows[0].password);
      if (!isMatch) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      //  Return JWT
      const userId = res.rows[0].id;
      const payload = {
        user: {
          id: userId
        }
      };
      jwt.sign(
        payload,
        config.get('auth_config.jwtShhh'),
        { expiresIn: 18000 },
        (err, token) => {
          if (err) throw err;
          response.json({ token });
        }
      );
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('CatchBlock Err: ' + err.mesage);
      response.status(500).send('Server error');
      throw e;
    } finally {
      client.release();
    }
    //response.redirect('/');
  }
);

//  @route      POST api/auth
//  @desc       LOGOUT User
//  @access     PRIVATE
router.get('/logout', (request, response, next) => {
  console.log('preLogout: ' + req.isAuthenticated());
  request.logout();
  console.log('postLogout: ' + req.isAuthenticated());
  response.redirect('/');
});

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
