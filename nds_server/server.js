const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../nds_db/db');
const browse = require('./nds_fileMgmt/api/browse');
const account = require('./nds_userMgmt/api/account');

const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`listening on port ${PORT}`));

serv.use(bodyParser.json());
serv.use('/browse', browse);
serv.use('/account', account);

// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
    res.json(err);
});

module.exports = serv;