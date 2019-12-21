const express = require('express');
const pool = require('../nds_db/db');
const browse = require('./nds_fileMgmt/api/browse')

const serv = express();
const PORT = process.env.PORT || 5000;

serv.listen(PORT, () => console.log(`listening on port ${PORT}`));

serv.use('/browse', browse);

// MIDDLEWARE
//  error handling
serv.use((err, req, res, next) => {
    res.json(err);
});

module.exports = serv;