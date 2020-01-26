const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /api/library/artist/:id
//  @desc       Display Artist library
//  @access     PUBLIC
router.get('/:artist', (request, response, next) => {
  const { artist } = request.params;
  pool.query(
    'SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "$1"}\';',
    [artist],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

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

//  @route      GET /api/library/filter
//  @desc       Display Filtered library
//  @access     PUBLIC
router.get('/filter', (request, response, next) => {
  pool.query(
    'SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /browse/artist/:id
//  @desc       Display Artist's library  (Boone Howard)
//  @access     PUBLIC
router.get('/artist/:id', (request, response, next) => {
  pool.query(
    'SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "Boone Howard"}\';',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /browse/artist/profile/:id
//  @desc       Display Artist's profile  (Boone Howard)
//  @access     PUBLIC
router.get('/artist/profile/:id', (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM tbl_library WHERE id = $1', [id], (err, res) => {
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
