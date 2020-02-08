const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

router.get('/genus', (request, response, next) => {
  pool.query('SELECT DISTINCT genus FROM tbl_filters;', (err, res) => {
    if (err) return next(err);
    response.json(res.rows);
  });
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

//  @route      GET /api/library/filter/traits
//  @desc       Display all trait types (genus)
//  @access     PUBLIC

//  @route      GET /api/library/traits/:genus
//  @desc       Get all species for a genus
//  @access     PUBLIC
router.get('/traits/:genus', (request, response, next) => {
  const { genus } = request.params;
  const query = {
    text: 'SELECT species FROM tbl_filters WHERE genus = $1;',
    values: [genus]
  };

  pool.query(query, (err, res) => {
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
router.use((err, request, response, next) => {
  res.json(err);
});

module.exports = router;
