const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../nds_db/db');
const admin = require('./nds_admin/api/admin');
const needledrop = require('./nds_admin/api/needleDrop');
const purchase = require('./nds_eCom/api/purchase');
const library = require('./nds_libraryMgmt/api/library');
const filter = require('./nds_libraryMgmt/api/filter');
const auth = require('./nds_userMgmt/api/auth');
const user = require('./nds_userMgmt/api/user');
const profile = require('./nds_userMgmt/api/profile');

const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`GOOD: Server listening on port ${PORT}`));

//  Init Middleware
//  Express bodyParser
serv.use(express.json({ extended: false }));
//  _admin
serv.use('/api/admin', admin);
serv.use('/api/needledrop', needledrop);
//  _eCom
serv.use('/api/purchase', purchase);
//  _fileMgmt
serv.use('/api/library', library);
serv.use('/api/library/filter', filter);
//  _userMgmt
serv.use('/api/user', user);
serv.use('/api/user/auth', auth);
serv.use('/api/user/profile', profile);

// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
  res.json(err);
});

module.exports = serv;
