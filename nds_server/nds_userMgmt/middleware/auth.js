const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
//  PassportJS
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(req, res, next) {
  console.log('FXN: /middleware/auth.js , auth()');

  //  Get token from header
  const token = req.header('x-auth-token');
  console.log(token);

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

// app.get('/login', (req, res) => {
//         res.render('login');
// });

// app.post('/login', passport.authenticate('local', {
//         failureRedirect: '/login',
//         successRedirect: '/dashboard'
// }));

// passport.use(new LocalStrategy(
//      (username, password, done) => {
//          if(username === 'test@gmail.com' && password === '1234') {
//              return done(null, {username: 'test@gmail.com'});
//          } else {
//              return done(null, false);
//          }
//       }
// ));

// function isLoggedIn(req ,res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }else{
//     return res.redirect('/login');
// }

passport.use(
  'local',
  new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
      loginAttempt();

      async function loginAttempt() {
        //  Initiate db Connection
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          var currentAccountsData = await JSON.stringify(
            //  SELECT 'UUID' of 'email'
            client.query(
              'SELECT id, username, "email", "password" FROM tbl_user WHERE "email"=$1',
              [email],
              function(err, result) {
                if (err) {
                  return done(err);
                }
                if (result.rows[0] == null) {
                  //  User Not Exist
                  //req.flash('danger', 'Oops. Incorrect login details.');
                  return done(null, false);
                } else {
                  //  User Does Exist
                  //  Get/Compare User Password
                  bcrypt.compare(password, result.rows[0].password, function(
                    err,
                    check
                  ) {
                    if (err) {
                      //  Failure
                      console.log('Error while checking password');
                      return done();
                    } else if (check) {
                      //  Success!!!
                      return done(null, [
                        {
                          email: result.rows[0].email,
                          firstName: result.rows[0].firstName
                        }
                      ]);
                    } else {
                      //  Failure
                      //req.flash('danger', 'Oops. Incorrect login details.');
                      return done(null, false);
                    }
                  });
                }
              }
            )
          );
        } catch (e) {
          throw e;
        }
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});
