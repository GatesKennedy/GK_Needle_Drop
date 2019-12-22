const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../nds_db/db');
const needledrop = require('./nds_admin/api/needleDrop');
const purchase = require('./nds_eCom/api/purchase');
const browse = require('./nds_fileMgmt/api/browse');
const user = require('./nds_userMgmt/api/user');
const profile = require('./nds_userMgmt/api/profile');


const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`listening on port ${PORT}`));

serv.use(bodyParser.json());
//  _admin
serv.use('/needledrop', needledrop);
//  _eCom
serv.use('/purchase', purchase);
//  _fileMgmt
serv.use('/browse', browse);
//  _userMgmt
serv.use('/user', user);
serv.use('/profile', profile);


// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
    res.json(err);
});

module.exports = serv;