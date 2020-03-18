const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const pool = require('../nds_db/db');
//  Auth
const passport = require('passport');
const session = require('express-session');
const expressSession = require('express-session');

//  ~ APIs ~
const admin = require('./nds_admin/api/admin');
const needledrop = require('./nds_admin/api/needleDrop');
const purchase = require('./nds_eCom/api/purchase');
const library = require('./nds_libraryMgmt/api/library');
const filter = require('./nds_libraryMgmt/api/filter');
const playlist = require('./nds_libraryMgmt/api/playlist');
const playall = require('./nds_libraryMgmt/api/playall');
const user = require('./nds_userMgmt/api/user');
const auth = require('./nds_userMgmt/api/auth');
const profile = require('./nds_userMgmt/api/profile');

const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`GOOD: Server listening on port ${PORT}`));

//  Init Middleware

//  Express bodyParser
serv.use(express.json({ extended: false }));
//serv.use(require('body-parser').urlencoded({ extended: true }));
//serv.use(cookieParser());
//  _admin
serv.use('/api/admin', admin);
serv.use('/api/needledrop', needledrop);
//  _eCom
serv.use('/api/purchase', purchase);
//  _fileMgmt
serv.use('/api/library', library);
serv.use('/api/library/filter', filter);
serv.use('/api/library/playlist', playlist);
serv.use('/api/library/playall', playall);
//  _userMgmt
serv.use('/api/user', user);
serv.use('/api/user/profile', profile);
serv.use('/api/auth', auth);
//      auth
serv.use(passport.initialize());
serv.use(passport.session());
serv.use(session({ secret: 'keyboard cat' }));
serv.use(expressSession({ secret: 'mySecretKey' }));

serv.use('../nds_client/public', express.static(__dirname + '/public'));

serv.use(bodyParser());

//require('./lib/routes.js')(app);

// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
  res.json(err);
});

module.exports = serv;
