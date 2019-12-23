const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /browse
//  @desc       Display ALL library
//  @access     PUBLIC
router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
        if (err) return next(err);
        
        response.json(res.rows);
    });
});
//  @route      GET /browse/filter
//  @desc       Display Filtered library
//  @access     PUBLIC
router.get('/filter', (request, response, next) => {
    pool.query('SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
        if (err) return next(err);
        
        response.json(res.rows);
    });
});

//  @route      GET /browse/artist/:id
//  @desc       Display Artist's library  (Boone Howard)
//  @access     PUBLIC
router.get('/artist/:id', (request, response, next) => {
    pool.query('SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';', (err, res) => {
        if (err) return next(err);
        
        response.json(res.rows);
    });
});

//  @route      GET /browse/artist/profile/:id
//  @desc       Display Artist's profile  (Boone Howard)
//  @access     PUBLIC
router.get('/artist/profile/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_library WHERE id = $1', [id], (err, res,) =>{
        if(err) return next(err);

        response.json(res.rows);
    });
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /admin/lib/:id
//  @desc       Register USER
//  @access     PUBLIC

//  ==============
//  ==  DELETE  ==
//  ==============
//  @route      GET /admin/lib/:id
//  @desc       Delete USER
//  @access     PRIVATE

module.exports = router;