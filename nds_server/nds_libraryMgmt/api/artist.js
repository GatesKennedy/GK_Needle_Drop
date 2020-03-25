const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/artists
//  @desc       Display All Artists
//  @access     PUBLIC
router.get('/artists', (request, response, next) => {
  pool.query(
    "SELECT DISTINCT data_json ->> 'artist' AS artist FROM tbl_library;",
    //  "SELECT id, data_json ->> 'song' AS song, data_json->> 'artist' AS artist FROM tbl_library WHERE data_json @> '{\"artist\": \"Boone Howard\"}';",
    (err, res) => {
      if (err) {
        console.error(err.message);
        response.status(500).send('Server Error');
      }
      response.json(res.rows);
    }
  );
});

//  @route      GET /api/library/:artist
//  @desc       Load Artist profile
//  @access     PUBLIC
router.get('/artist/:id', (request, response, next) => {
  const { id } = request.params;
  pool.query(
    'SELECT * FROM tbl_library WHERE data_json @> \'{"artist": "$1"}\';',
    [id],
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /admin/lib/artist
//  @desc       Register Artist
//  @access     PUBLIC

//  ==============
//  ==  DELETE  ==
//  ==============
//  @route      GET /admin/lib/artist
//  @desc       Delete Artist
//  @access     PRIVATE

//  Catch-All Error Function
router.use((err, request, response, next) => {
  console.log('Next FXN Error response');
  response.json(err);
});

module.exports = router;
