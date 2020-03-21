const { Router } = require('express');
const pool = require('../../../nds_db/db');
const auth = require('../../nds_userMgmt/middleware/auth');
const { check, validationResult } = require('express-validator');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============

//  @route      GET /api/library/playlist/names/all
//  @desc       Get All Playlists
//  @access     PUBLIC
router.get('/names/all', (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const queryText = 'SELECT * FROM tbl_playlist';
    client.query(queryText, (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      response.json(res.rows);
    });
  });
});
//  @route      GET /api/library/playlist/admin
//  @desc       Get Admin Playlists
//  @access     PUBLIC
router.get('/names/admin', (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const query = 'SELECT * FROM tbl_playlist WHERE creator IS NULL ';
    client.query(query, (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      response.json(res.rows);
    });
  });
});

//  @route      GET /api/library/playlist/user
//  @desc       Get User Playlists
//  @access     PRIVATE
router.get('/names/user', auth, (request, response, next) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const query = 'SELECT * FROM tbl_playlist WHERE creator IS NULL ';
    client.query(query, (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      response.json(res.rows);
    });
  });
});

//  @route      GET /api/library/playlist/select
//  @desc       Get ALL Playlist Data
//  @access     PUBLIC
router.get('/select/:id', auth, (request, response, next) => {
  const reqString = JSON.stringify(request.body);
  console.log('API /playlist/select > reqString = ' + reqString);

  const { id } = request.params;
  console.log('API /playlist/select > id = ' + id);

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    const queryText = `SELECT 
        pl.id, 
        pl.name, 
        json_agg(json_build_object(
          'id', pa.song_id, 
          'song', li.data_json->>'song',
          'artist', li.data_json->>'artist',
          'time', li.data_json->>'time',
          'rank', pa.rank          )) AS trks
      FROM tbl_playlist AS pl
      INNER JOIN tbl_playall AS pa ON pl.id = pa.list_id
      LEFT JOIN tbl_library AS li ON pa.song_id = li.id
      WHERE pl.id = ($1)
      GROUP BY pl.id, pl.name`;
    client.query(queryText, [id], (err, res) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      const resString = JSON.stringify(res.rows);
      console.log('API /playlist/select > resString = ' + resString);
      response.json(res.rows);
    });
  });
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /api/library/playlist
//  @desc       Create Playlist
//  @access     PRIVATE

router.post(
  '/',
  auth,
  [
    check('name', 'Playlist name is required')
      .not()
      .isEmpty(),
    check('name', 'Playlist name can only be 20 characters').isLength({
      max: 21
    })
  ],
  async (request, response, next) => {
    const { name, creator } = request.body;
    //  Error Response
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    //  Async db Connection
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const insertText =
        'INSERT INTO tbl_playlist(name, creator) VALUES($1, $2) RETURNING id';
      const insertVals = [name, creator];
      const res = await client.query(insertText, insertVals);
      response.json(res.rows[0].id);
      await client.query('COMMIT');
    } catch (e) {
      //  Catch
      await client.query('ROLLBACK');
      console.error('CatchBlock Err: ' + e.mesage);
      response.status(500).send('Server error');
      throw e;
    } finally {
      //  Finally
      client.release();
    }
  }
);

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
