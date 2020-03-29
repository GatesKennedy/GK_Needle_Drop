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
router.get('/all', async (request, response, next) => {
  const client = await pool.connect();

  try {
    const queryText = `
    SELECT 
        id,
        song, 
        artist, 
        time 
    FROM tbl_library;`;
    const res = await client.query(queryText);

    response.json(res.rows);
  } catch (err) {
    console.error('API > /library/all > CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
  } finally {
    client.release();
  }
});
//  @route      GET /api/library/result
//  @desc       Load libResult 'trkData' from library
//  @access     PUBLIC
router.get('/result', async (request, response, next) => {
  const client = await pool.connect();

  try {
    const queryText = `
    SELECT 
        id, 
        song, 
        artist, 
        time 
    FROM tbl_library
    WHERE artist ~* 'ray rude';`;
    const res = await client.query(queryText);

    response.json(res.rows);
  } catch (err) {
    console.error('API > /library/result > CatchBlock Err: ' + err.mesage);
    response.status(500).send('Server error');
    return next(err);
  } finally {
    client.release();
  }
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
