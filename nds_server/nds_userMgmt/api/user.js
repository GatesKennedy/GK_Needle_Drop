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

//  @route      GET api/user/
//  @desc       GET Auth User
//  @access     PRIVATE
router.get('/auth', (request, response, next) => {
  if (request.isAuthenticated()) {
    //  GET User :id for Redirect
    //  REDIRECT to Profile
    response.redirect('/profile/');
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

//  @route      POST api/user/register
//  @desc       REGISTER User
//  @access     PUBLIC
router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6
    })
  ],
  async (request, response, next) => {
    const { name, email, password } = request.body;
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
        console.log(res.rows);
        return response
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //  Encrypt User Password
      const salt = await bcrypt.genSalt(10);
      const pwCrypt = await bcrypt.hash(password, salt);
      //  Create User (SQL: tbl_user)
      const insertText =
        'INSERT INTO tbl_user(name, email, password) VALUES($1, $2, $3) RETURNING id';
      const insertValues = [name, email, pwCrypt];
      const rez = await client.query(insertText, insertValues);
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
      await client.query('COMMIT');
    } catch (e) {
      //  Catch
      await client.query('ROLLBACK');
      console.error('CatchBlock Err: ' + e.mesage);
      response.status(500).send('Server error');
      throw e;
    } finally {
      //  Finally
      client.release();
    }
  }
);

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
