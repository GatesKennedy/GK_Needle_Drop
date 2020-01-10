const { Router } = require('express');
const pool = require('../../../nds_db/db');
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

//  ~ Routes ~

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
//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST api/user
//  @desc       Register User
//  @access     PUBLIC
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password: 6 characters min').isLength({ min: 6 })
  ],
  (request, response, next) => {
    const { name, email, password } = request.body;
    console.log(request.body);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    pool.query(
      'INSERT INTO tbl_user(name, email, password) VALUES($1, $2, $3)',
      [name, email, password],
      (err, res) => {
        //const { id } = res.body;
        if (err) return next(err);

        // % % ERROR % %
        //    pass :id value
        //    const id = res.json(id);
        response.send('User Created');
      }
    );
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

module.exports = router;
