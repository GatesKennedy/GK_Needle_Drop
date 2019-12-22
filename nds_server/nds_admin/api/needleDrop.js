const { Router } = require('express');
const pool = require('../../../nds_db/db');

const router = Router();

//  ~ Routes ~

//  @route      POST api/profile
//  @desc       Register profile
//  @access     Public
router.get('/', (request, response, next) => {

    response.send("Welcome to Needle Drop Co.");
});

module.exports = router;