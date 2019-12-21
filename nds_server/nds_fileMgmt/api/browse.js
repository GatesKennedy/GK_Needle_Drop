const express = require('express');
const browse = require('../middleware/routes')

const serv = express();

serv.use('/browse', browse);

serv.use((err, req, res, next) => {
    res.json(err);
});

module.exports = serv;