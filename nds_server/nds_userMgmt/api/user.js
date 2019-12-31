const { Router } = require('express');
const pool = require('../../../nds_db/db');
//const express = require('express');
//const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');


const router = Router();

//  ~ Routes ~

//  =============
//  ==   GET   ==
//  =============
//  @route      GET /user/:id
//  @desc       Display USER
//  @access     PRIVATE
router.get('/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_user WHERE id = $1', [id], (err, res,) =>{
        if(err) return next(err);

        response.json(res.rows);
    });
});

//  ==============
//  ==   POST   ==
//  ==============
//  @route      POST /user/register
//  @desc       Register USER
//  @access     PUBLIC
router.post('/register', (request, response, next) => {
    const { name, email, password } = request.body;

    pool.query(
        'INSERT INTO tbl_user(name, email, password) VALUES($1, $2, $3)',
        [name, email, password],
        (err, res,) =>{
            if(err) return next(err);
            
            // % % ERROR % %
            //  pass :id value
            const id = res.json(id);
            response.redirect('/profile/:$1', [ id ]);
        }
    );
});

//  =============
//  ==   PUT   ==
//  =============
//  @route      GET /user/:id
//  @desc       Edit USER
//  @access     PRIVATE

//      router.put();

//  ==============
//  ==  DELETE  ==
//  ==============
//  @route      GET /user/:id
//  @desc       Delete USER
//  @access     PRIVATE

//      router.delete();


module.exports = router;

