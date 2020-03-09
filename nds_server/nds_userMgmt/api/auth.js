const express = require('express');
const router = express.Router();
const request = require('request');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;

// const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');

const pool = require('../../../nds_db/db');

//================================================
//================================================

//  @route      GET api/user/auth
//  @desc       Return User Data
//  @access     Public
router.get('/', auth, (req, res) => res.send('Auth route'));

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
