const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /api/library/all
//  @desc       Load ALL 'songs and artist' in library
//  @access     PUBLIC
router.get('/all', (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `SELECT 
          id, 
          data_json ->> 'song' AS song, 
          data_json->> 'artist' AS artist, 
          data_json->> 'time' AS time 
      FROM tbl_library 
      WHERE data_json @> '{\"artist\": \"Boone Howard\"}';`,
      //"SELECT id, data_json ->> 'song' AS song, data_json->> 'artist' AS artist, data_json ->> 'time' AS time FROM tbl_library;",
      (err, res) => {
        release();
        if (err) {
          return console.error('Error executing query', err.stack);
        }
        response.json(res.rows);
      }
    );
  });
});

//  @route      GET /api/library/track/:id
//  @desc       Select Track
//  @access     PUBLIC
router.get('/track/:id', (request, response, next) => {
  const { id } = request.params;
  const query = {
    text: 'SELECT * FROM tbl_library WHERE id = $1',
    values: [id]
  };

  pool.query(query, (err, res) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      return next(err);
    }

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

//  Catch-All Error Function
router.use((err, request, response, next) => {
  console.log('Next FXN Error response');
  response.json(err);
});

module.exports = router;
