//  EXPRESS
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//  TOOL/PKG
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//  MID
const auth = require('../middleware/auth');
const pool = require('../../../nds_db/db');

//  =============
//  ==   GET   ==
//  =============

//  LOAD USER
//  @route      GET api/auth
//  @desc       AUTH Token | LOAD User
//  @access     PRIVATE
router.get('/', auth, (request, response) => {
  try {
    pool.query(
      'SELECT id, name, email, role, date_join FROM tbl_user WHERE id=($1)',
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

//  ==============
//  ==   POST   ==
//  ==============

//  LOGIN
//  @route      POST api/auth
//  @desc       LOGIN-AUTH User | GET Token
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
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('CatchBlock Err: ' + err.mesage);
      response.status(500).send('Server error');
      throw err;
    } finally {
      client.release();
    }
    //response.redirect('/');
  }
);

//  REGISTER
//  @route      POST api/auth/register
//  @desc       REGISTER User
//  @access     PUBLIC
router.post(
  '/register',
  [
    check('username', 'username is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  async (request, response, next) => {
    //>< >< >< >< !VALIDATE ROLE! >< >< >< ><
    const { username, email, password, role } = request.body;
    //  Error Response
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //  Async db Connection
    const client = await pool.connect();
    try {
      //  Check: User Registration
      await client.query('BEGIN');
      //  Check Email exists
      const queryText = 'SELECT name FROM tbl_user WHERE email = ($1)';
      const res = await client.query(queryText, [email]);
      //  IF email already Exists...
      if (res.rows.length > 0) {
        return response
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      console.log('>Email');
      //  Encrypt User Password
      const salt = await bcrypt.genSalt(10);
      const pwCrypt = await bcrypt.hash(password, salt);
      console.log('>Password');
      //  Create User (SQL: tbl_user)
      const insertText =
        'INSERT INTO tbl_user(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING id';
      const insertValues = [username, email, pwCrypt, role];
      const rez = await client.query(insertText, insertValues);
      console.log('>INSERT');
      //  Return JWT
      const userId = rez.rows[0].id;
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
      console.log('>JWT');
      await client.query('COMMIT');
    } catch (e) {
      //  Catch
      await client.query('ROLLBACK');
      console.error('API > /auth/register > CatchBlock Err: ' + e.mesage);
      response.status(500).send('Server error');
      throw e;
    } finally {
      //  Finally
      client.release();
    }
    //  Redirect to /root  (/library)
  }
);

//-----------------------------------------------------------------
//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
