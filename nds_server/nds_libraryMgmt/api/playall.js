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

//  ==============
//  ==   POST   ==
//  ==============

//  ==============
//  ==  DELETE  ==
//  ==============

//  Catch-All Error Function
router.use((err, request, response, next) => {
  res.json(err);
});

module.exports = router;
