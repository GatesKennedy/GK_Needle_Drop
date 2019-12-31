const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

//================================================
//================================================

//  @route      GET api/auth
//  @desc       Return User Data
//  @access     Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log('api/auth.js: catch err');
    console.error(err.message);
    res.status(500).send('MSG: Server Error');
  }
});

//  @route      POST api/auth
//  @desc       Authenticate user & get token
//  @access     Public
router.post(
  '/',
  [
    check('username', 'Valid username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  // Check for errors in req body
  async (req, res) => {
    console.log('Check for errors in req body');
    console.log(req.body);
    console.log('request body is above..');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('api/auth.js: errors list is NOT empty');
      console.log(errors);
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { username, password } = req.body;

    //  See if user exists
    try {
      console.log('api/auth.js: check if user exists');
      let user = await User.findOne({
        username
      });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials'
            }
          ]
        });
      }

      //  Verify Password Matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid Credentials'
            }
          ]
        });
      }
      //  Return jsonWebToken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.log('api/auth.js: catch error Activated');
      console.error(err.message);
      res.status(500).send('MSG: Server error');
    }
  }
);

module.exports = router;
