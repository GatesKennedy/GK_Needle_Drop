const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //  Get token from header
  const token = req.header('x-auth-token');

  //  Check if no token
  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  }
  console.log('/middleware/auth.js req.user: ' + req.user);
  //  Verify token
  try {
    const decoded = jwt.verify(token, config.get('auth_config.jwtShhh'));

    //  set request object to the decoded object value
    req.user = decoded.user;

    console.log('/middleware/auth.js req.user (decoded): ' + req.user);
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }
};
