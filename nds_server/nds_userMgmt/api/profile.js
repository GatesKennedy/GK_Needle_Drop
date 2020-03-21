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
//  @desc       LOAD PROFILE
//  @access     PRIVATE
router.get('/me', auth, async (request, response, next) => {
  const user_id = request.user.id;
  console.log('API > /profile/me > user_id = ' + user_id);
  //  Async db Connection
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    //  Load Profile Data
    const queryText = `SELECT 
    json_build_object(
      'user_id', Usr.id,
      'user_name', Usr.name,
      'user_role', Usr.role, 
      'entity', Pro.entity, 
      'location', Pro.location,
      'payment', Pro.payment_info) AS profile, 
	  json_agg(DISTINCT Fav.song_id) AS favorites,
	  json_agg(DISTINCT Ply.id)      AS playlists
    FROM      tbl_user     AS Usr
    LEFT JOIN tbl_favorite AS Fav ON Usr.id = Fav.user_id
    LEFT JOIN tbl_profile  AS Pro ON Usr.id = Pro.user_id
    LEFT JOIN tbl_playlist AS Ply ON Usr.id = Ply.creator
    WHERE Usr.id = ($1)
    GROUP BY Usr.id, Pro.entity, Pro.location, Pro.payment_info;`;
    const res = await client.query(queryText, [user_id]);
    //  Error Response
    if (!res.rows.length > 0) {
      return response
        .status(400)
        .json({ errors: [{ msg: 'No Profile Found' }] });
    }
    //  Check response
    const resLog = JSON.stringify(res.rows);
    response.json(res.rows);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
  } finally {
    client.release();
  }
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
//  @desc       CREATE PROFILE
//  @access     Public
router.post('/create', auth, async (request, response, next) => {
  const user_id = request.user.id;
  console.log('API > /profile/create > user_id = ' + user_id);
  // const { user_id } = request.body;
  // console.log('API > /profile/create > user_id =' + user_id);

  //  async db Connection
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    //  Create Profile - Get user_id
    const insertText = 'INSERT INTO tbl_profile(user_id) VALUES($1)';
    await client.query(insertText, [user_id]);
    //  Return Profile Data
    const queryText = `
    SELECT 
      P.user_id, 
      U.name user_name, 
      U.role user_role, 
      P.entity
    FROM tbl_user AS U
    LEFT JOIN tbl_profile AS P ON U.id = P.user_id
    WHERE P.user_id = $1`;
    const rez = await client.query(queryText, [user_id]);
    response.json(rez.rows);
    await client.query('COMMIT');
    //  Catch
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
    //throw err;
  } finally {
    //  Finally
    client.release();
  }
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
