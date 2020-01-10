const { Router } = require('express');
const pool = require('../../../nds_db/db');
const gravatar = require('gravatar');
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

module.exports = router;
