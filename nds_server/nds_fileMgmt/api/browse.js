const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
        if (err) return next(err);
    
        response.json(res.rows);
    });
});

router.get('/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_library WHERE id = $1', [id], (err, res,) =>{
        if(err) return next(err);

        response.json(res.rows);
    });
});

module.exports = router;