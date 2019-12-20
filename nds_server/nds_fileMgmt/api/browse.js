const express = require('express');
const pool = require('../../../nds_db/index');

const serv = express();

serv.get('/browse', (request, response) => {
    pool.query('SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
        if (err) return console.log(err);
    
        console.log(res.rows);
    });
});
/*
const port = 3000; 

serv.listen(port, () => console.log(`listening on port ${port}`));
*/
module.exports = serv;