const { Router } = require('express');
const pool = require('../../../nds_db/db');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');


const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /profile/me
//  @desc       Display profile by 'id'
//  @access     PRIVATE
router.get('/me', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res,) =>{
        if(err) {
            return next(err);
        }
        respond.send('coco profile');
        response.json(res);
    });
});

//  @route      GET /profile/me/favorites
//  @desc       Display playlists for Current User
//  @access     PRIVATE
router.get('/me/favorites', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res,) =>{
        if(err) {
            return next(err);
        }
        respond.send('coco profile');
        response.json(res);
    });
});

//  @route      GET /profile/me/playlists
//  @desc       Display playlists for Current User
//  @access     PRIVATE
router.get('/me/playlists', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res,) =>{
        if(err) {
            return next(err);
        }
        respond.send('coco profile');
        response.json(res);
    });
});

//  @route      GET /profile/playlists/:id
//  @desc       Display profile by 'id'
//  @access     PRIVATE
router.get('/me/playlists/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res,) =>{
        if(err) {
            return next(err);
        }
        respond.send('coco profile');
        response.json(res);
    });
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /profile/create
//  @desc       Create profile
//  @access     Public
router.post('/create', (request, response, next) => {
    const { name, email, password } = request.body;
    const { id } = request.params;

    pool.query(
        'INSERT INTO tbl_profile WHERE id = $1 (name, email, password) VALUES($1, $2, $3)',
        [name, email, password],
        (err, res,) =>{
            if(err) return next(err);
            

            response.redirect('/profile/:id');
        }
    );
});

//  =============
//  ==   PUT   ==
//  =============
//  @route      PUT /profile/edit/:id
//  @desc       Edit USER
//  @access     PRIVATE
router.put();


module.exports = router;

