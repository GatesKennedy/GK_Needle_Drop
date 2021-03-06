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

//  SCRAP SCRAP SCRAP SCRAP SCRAP
//  SCRAP SCRAP SCRAP SCRAP SCRAP
router.get('/libtraits', (request, response, next) => {
  const query =
    "SELECT id, song_url, data_json ->> 'kw' AS keyword, data_json ->> 'tag' AS tag, data_json ->> 'inst' AS instrument, data_json ->> 'type' AS type, data_json ->> 'genre' AS genre, data_json ->> 'style' AS style FROM tbl_library;";
  pool.query(query, (err, res) => {
    if (err) {
      return console.error('Error: executing query', err.stack);
    }
    response.json(res.rows);
  });
});

//  @route      GET /api/library/filter/traits
//  @desc       Get ALL traits
//  @access     PUBLIC
router.get('/traits', async (request, response, next) => {
  const client = await pool.connect();
  try {
    const queryText = `
    SELECT 
      genus, 
      json_agg(species) AS species 
    FROM tbl_filter 
    GROUP BY genus;`;
    const res = await client.query(queryText);
    // const resString = JSON.stringify(res.rows);
    // console.log('API > /filter/traits > resString: ' + resString);
    //  Error Response
    if (!res.rows.length > 0) {
      return response
        .status(400)
        .json({ errors: [{ msg: 'No Traits Found' }] });
    }
    response.json(res.rows);
  } catch (err) {
    return next(err);
  }
});

//  @route      GET /api/library/filter/genus
//  @desc       Get all trait types (genus)
//  @access     PUBLIC
router.get('/genus', (request, response, next) => {
  pool.query('SELECT DISTINCT genus FROM tbl_filter;', (err, res) => {
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
