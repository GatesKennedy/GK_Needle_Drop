const { Router } = require('express');
const pool = require('../../../nds_db/db');
//const express = require('express');
//const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');


const router = Router();

//  ~ Routes ~

//  @route      POST api/users
//  @desc       Register user
//  @access     Public
router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM tbl_user;', (err, res) => {
        if (err) return next(err);
        
        response.json(res.rows);
    });
});

//  @route      POST api/users
//  @desc       Register user
//  @access     Public
router.get('/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_user WHERE id = $1', [id], (err, res,) =>{
        if(err) return next(err);

        response.json(res.rows);
    });
});

//  @route      POST api/users
//  @desc       Register user
//  @access     Public
router.post('/', (request, response, next) => {
    const { name, email, password } = request.body;

    pool.query(
        'INSERT INTO tbl_user(name, email, password) VALUES($1, $2, $3)',
        [name, email, password],
        (err, res,) =>{
            if(err) return next(err);

            response.redirect('/account');
        }
    );
});


module.exports = router;

