const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pool = require('../../../nds_db/db');
const auth = require('../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

//================================================
//================================================

//  @route      GET api/user/auth
//  @desc       Return User Data
//  @access     Public
router.get('/auth', auth, async (req, res) => {
  console.log('api/user/auth: ' + req.user);

  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log('api/auth.js: catch err');
    console.error(err.message);
    res.status(500).send('MSG: Server Error');
  }
});

//  @route      POST api/user/auth
//  @desc       Authenticate user & get token
//  @access     Public
router.post(
  '/auth',
  [
    check('username', 'Valid username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  // Check for errors in req body
  async (req, res) => {
    console.log('Check for errors in req body');
    console.log(req.body);

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

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
