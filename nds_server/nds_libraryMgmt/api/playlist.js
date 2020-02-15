const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/playlist/all
//  @desc       Get ALL playlists
//  @access     PUBLIC
router.get('/all', (request, response, next) => {
  pool.query(
    'SELECT list_name, json_agg(song_id) FROM tbl_playlists group by 1;',
    (err, res) => {
      if (err) return next(err);

      response.json(res.rows);
    }
  );
});

//  @route      GET /api/library/playlist/1/:name
//  @desc       Get ALL playlists
//  @access     PUBLIC
router.get('/1/:list_name', (request, response, next) => {
  const { list_name } = request.params;
  const query = {
    text:
      //'SELECT name, json_agg(song_list_name) FROM tbl_playlists WHERE list_name = $1;',
      'SELECT song_id FROM tbl_playlists WHERE list_name = $1',
    values: [list_name]
  };

  pool.query(query, (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

//  @route      GET /api/library/playlist/:search
//  @desc       Display Artist library
//  @access     PUBLIC
// router.get('/:search', (request, response, next) => {
//   const { search } = request.params;
//   pool.query(
//     'SELECT * FROM tbl_library WHERE data_json @> \'{"search": "$1"}\';',
//     [artist],
//     (err, res) => {
//       if (err) return next(err);

//       response.json(res.rows);
//     }
//   );
// });

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
