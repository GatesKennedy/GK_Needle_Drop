const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  @route      POST api/profile
//  @desc       Register profile
//  @access     Public
router.get('/', (request, response, next) => {
  response.send('Needle Drop Co. Administration');
});

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
