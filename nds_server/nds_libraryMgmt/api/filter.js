const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/search/:search
//  @desc       Display Artist library
//  @access     PUBLIC
router.get('/search/:search', (request, response, next) => {
  const { search } = request.params;
  pool.query(
    'SELECT * FROM tbl_library WHERE data_json @> \'{"search": "$1"}\';',
    [artist],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /api/library/filter_list
//  @desc       Display Filtered library
//  @access     PUBLIC
router.get('/filter_list', (request, response, next) => {
  pool.query('SELECT * FROM tbl_filters;', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST
//  @desc
//  @access     PUBLIC

//  ==============
//  ==  DELETE  ==
//  ==============
//  @route      DELETE
//  @desc
//  @access     PRIVATE

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
