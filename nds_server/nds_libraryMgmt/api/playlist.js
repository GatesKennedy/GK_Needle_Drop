const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/playlist/all
//  @desc       Get All Playlist Names
//  @access     PUBLIC
router.get('/names', (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const query = 'SELECT * FROM tbl_playlists';
    client.query(query, (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      response.json(res.rows);
    });
  });
});

//  @route      GET /api/library/playlist/all
//  @desc       Get ALL Playlist Data
//  @access     PUBLIC
router.get('/all', (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const query =
      'SELECT tbl_playlists.id, name, song_id, rank FROM tbl_playlists INNER JOIN tbl_playall ON tbl_playlists.id = tbl_playall.list_id';
    client.query(query, (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      response.json(res.rows);
    });
  });
});

//  @route      GET /api/library/playlist/all
//  @desc       Get ALL playlists
//  @access     PUBLIC
// router.get('/all', (request, response, next) => {
//   pool.query(
//     'SELECT id, list_name, json_agg(song_id) FROM tbl_playlists group by 1;',
//     (err, res) => {
//       if (err) return next(err);

//       response.json(res.rows);
//     }
//   );
// });

//  @route      GET /api/library/playlist/1/:name
//  @desc       Get Playlist by Name
//  @access     PUBLIC
router.get('/1/:id', (request, response, next) => {
  const { id } = request.params;
  const query = {
    text:
      //'SELECT name, json_agg(song_id) FROM tbl_playlists WHERE id = $1;',
      "SELECT tbl_playall.list_id, song_id, tbl_library.data_json ->> 'song' AS song, tbl_library.data_json ->> 'artist' AS artist, tbl_library.data_json ->> 'time' AS time, rank FROM tbl_playall INNER JOIN tbl_library ON tbl_playall.song_id = tbl_library.id WHERE tbl_playall.list_id = $1",
    values: [id]
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
