const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../../models/userModel');

const router = express.Router();

router.post('/', (req, res, next) => {
    console.log(req.body.email)
    console.log(req.body.firstName)
    const newUser = new User({
       email: req.body.email,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       password: bcrypt.hashSync(req.body.password, 10)
    });
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'Email already in use'
            })
        }
        return res.status(200).json({
            title: 'Signup successful!'
        })
    })
})

module.exports = router;