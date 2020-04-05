const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

module.exports = function(req, res, next) {
  //console.log('FXN: /middleware/auth.js , auth()');
  //  Get token from header
  const token = req.header('x-auth-token');
  console.log('Token: ' + token);
  //  Check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }
  //  Verify token
  try {
    const decoded = jwt.verify(token, config.get('auth_config.jwtShhh'));
    //  set request object to the decoded object value
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});
