const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/filter/libtraits
//  @desc       Get ALL traits
//  @access     PUBLIC
/*  Trait Columns
  arc
  kw1, 2, 3
  tag1, 2, 3
  type
  inst1, 2, 3
  genre1, 2, 3
  style1, 2, 3
*/
router.get('/libtraits', (request, response, next) => {
  pool.query('SELECT id, data_json ->> ');
});

//  @route      GET /api/library/filter/traits
//  @desc       Get ALL traits
//  @access     PUBLIC
router.get('/traits', (request, response, next) => {
  pool.query(
    'SELECT genus, json_agg(species) AS species FROM tbl_filters group by 1;',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /api/library/filter/genus
//  @desc       Get all trait types (genus)
//  @access     PUBLIC
router.get('/genus', (request, response, next) => {
  pool.query('SELECT DISTINCT genus FROM tbl_filters;', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

//  @route      GET /api/library/filter/species/:genus
//  @desc       Get all species for a genus
//  @access     PUBLIC
router.get('/species/:genus', (request, response, next) => {
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
  response.json(err);
});

module.exports = router;
