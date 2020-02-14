const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/filter
//  @desc       Get ALL traits
//  @access     PUBLIC
router.get('/traits', (request, response, next) => {
  pool.query(
    'SELECT genus, json_agg(species) FROM tbl_filters group by 1;',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /api/library/search/:search
//  @desc       Display Artist library
//  @access     PUBLIC
router.get('/:search', (request, response, next) => {
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
router.use((err, request, response, next) => {
  res.json(err);
});

module.exports = router;
