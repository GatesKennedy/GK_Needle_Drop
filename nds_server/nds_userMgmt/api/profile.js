const { Router } = require('express');
const pool = require('../../../nds_db/db');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /api/user/profile/me
//  @desc       Display profile by 'id'
//  @access     PRIVATE
router.get('/me', (request, response, next) => {
  const { id } = request.params;

  pool.query(
    'SELECT user.name, pro.entity AS "entityType", pro.location, fav.song_id FROM tbl_profile AS "pro" INNER JOIN tbl_favorite AS "fav" ON pro.user_id = fav.user_id INNER JOIN tbl_user ON pro.user_id = user.id WHERE user.id = $1;',
    [id],
    (err, res) => {
      if (err) {
        return next(err);
      }
      respond.send('coco profile');
      response.json(res);
    }
  );
});

//  SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP.SCRAP
//----------------------------------------------------------
//  @route      GET /api/user/profile/me/favorite
//  @desc       Display Favorites by 'user_id'
//  @access     PRIVATE
router.get('/me/favorite', auth, async (request, response, next) => {
  const { id } = request.params;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText =
      'SELECT data_json AS song_data, song_url AS song_url FROM tbl_favorites AS fav INNER JOIN tbl_library AS lib ON fav.song_id = lib.id WHERE fav.user_id = $1';
    const res = await client.query(queryText, [id]);
    response.json(res.rows);
  } catch (err) {
    console.error('CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
  } finally {
    client.release();
  }
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /api/user/profile/create
//  @desc       Create profile
//  @access     Public
router.post('/create', auth, (request, response, next) => {
  const { user_id } = request.body;

  pool.query(
    'INSERT INTO tbl_profile(user_id) VALUES($1)',
    [user_id],
    (err, res) => {
      if (err) return next(err);
      // Return Profile Data
      response.status(400).json(res.rows);
    }
  );
});

//  @route      POST /api/user/profile/favorite
//  @desc       Update Favorites
//  @access     PRIVATE
router.post('/favorite', auth, async (request, response, next) => {
  const { user_id, song_id, exists } = request.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (exists) {
      //  remove song from favorites
      const queryText =
        'DELETE FROM tbl_favorite WHERE user_id = $1 AND song_id = $2';
      const deleteVals = [user_id, song_id];
      await client.query(queryText, deleteVals);
    } else {
      //  add song to favorites
      const queryText =
        'INSERT INTO tbl_favorite( user_id, song_id ) VALUES($1, $2)';
      const insertVals = [user_id, song_id];
      await client.query(queryText, insertVals);
    }
    //  return updated favorites
    const queryText = 'SELECT song_id FROM tbl_favorite WHERE user_id = $1';
    const queryVals = [user_id];
    const res = await client.query(queryText, queryVals);
    console.log('Returning Updated Favorites');
    response.json(res.rows);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    throw err;
  } finally {
    client.release();
  }
});

//  =============
//  ==   PUT   ==
//  =============
//  @route      PUT /api/user/profile/edit/:id
//  @desc       Edit USER
//  @access     PRIVATE

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

//=======================================
//=============  SCRAP SCRAP SCRAP
//=======================================

//  @route      GET /api/user/profile/me/favorite
//  @desc       Display Favorites by 'user_id'
//  @access     PRIVATE
router.get('/me/favorite', auth, async (request, response, next) => {
  const { id } = request.params;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText =
      'SELECT data_json AS song_data, song_url AS song_url FROM tbl_favorites AS fav INNER JOIN tbl_library AS lib ON fav.song_id = lib.id WHERE fav.user_id = $1';
    const res = await client.query(queryText, [id]);
    response.json(res.rows);
  } catch (err) {
    console.error('CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
  } finally {
    client.release();
  }
});

//  @route      GET /api/user/profile/me/playlist
//  @desc       Display playlists for Current User
//  @access     PRIVATE
router.get('/me/playlist', auth, (request, response, next) => {
  const { id } = request.params;

  pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err);
    }
    respond.send('coco profile');
    response.json(res);
  });
});
module.exports = router;
