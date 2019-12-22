const { Router } = require('express');
const pool = require('../../../nds_db/db');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');


const router = Router();

//  ~ Routes ~

//  @route      POST api/profile
//  @desc       Register profile
//  @access     Public
router.get('/', (request, response, next) => {
    //  % % ERROR % % 
    //  get auth user ID
    response.redirect("/profile/:id");
});


router.get('/:id', (request, response, next) => {
    const { id } =request.params;

    pool.query('SELECT * FROM tbl_profile WHERE id = $1', [id], (err, res,) =>{
        if(err) {
            pool.query(
                'INSERT INTO tbl_profile WHERE id = $1 (name, email, password) VALUES($1, $2, $3)',
                [name, email, password],
                (err, res,) =>{
                    if(err) return next(err);
                    
                    response.redirect('/profile/$1', [id]);
                }
            );
        }
        response.json(res.rows);
    });
});

//  @route      POST api/profile
//  @desc       Register profile
//  @access     Public
router.post('/:id', (request, response, next) => {
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


module.exports = router;

