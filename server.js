const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// load all env variables from .env file into process.env object.
require('dotenv').config();

//  ~ APIs ~
const admin = require('./nds_server/nds_admin/api/admin');
const needledrop = require('./nds_server/nds_admin/api/needleDrop');
const purchase = require('./nds_server/nds_eCom/api/purchase');
const library = require('./nds_server/nds_libraryMgmt/api/library');
const filter = require('./nds_server/nds_libraryMgmt/api/filter');
const playlist = require('./nds_server/nds_libraryMgmt/api/playlist');
const user = require('./nds_server/nds_userMgmt/api/user');
const auth = require('./nds_server/nds_userMgmt/api/auth');
const profile = require('./nds_server/nds_userMgmt/api/profile');

const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`GOOD: Server listening on port ${PORT}`));

//~~~~~~~~~~~~~~~~~~~~~~~
//    Init Middleware

//  Express bodyParser
serv.use(express.json({ extended: false }));
serv.use(bodyParser());

//~~~~~~~~~~~~~~~~~~~~~~~
//    Define Routes
//  _admin
serv.use('/api/admin', admin);
serv.use('/api/needledrop', needledrop);
//  _eCom
serv.use('/api/purchase', purchase);
//  _fileMgmt
serv.use('/api/library', library);
serv.use('/api/library/filter', filter);
serv.use('/api/library/playlist', playlist);
//  _userMgmt
serv.use('/api/user', user);
serv.use('/api/user/profile', profile);
serv.use('/api/auth', auth);

//~~~~~~~~~~~~~~~~~~~~~~~~
//  Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //  Set static folder
  serv.use(express.static('../nds_client/build'));
  //  Serve html file
  serv.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'nds_client', 'build', 'index.html'));
    console.log('STATIC FILE ROUTE *%*%*%*%*%*%*');
  });
} else if (process.env.NODE_ENV == 'development') {
  serv.use('../nds_client/public', express.static(__dirname + '/public'));
}

// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
  res.json(err);
});

module.exports = serv;
