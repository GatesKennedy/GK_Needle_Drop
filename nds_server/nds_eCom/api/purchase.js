const { Router } = require('express');
const pool = require('../../../nds_db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = Router();

//  ~ Routes ~

//  @route      POST api/profile
//  @desc       Register profile
//  @access     Public
router.get('/', (request, response, next) => {
  response.send('BUY! BUY! BUY! </ br> Consuuuuuume!');
});

//  Catch-All Error Function
router.use((err, req, res, next) => {
  res.json(err);
});

module.exports = router;
