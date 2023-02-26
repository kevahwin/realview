const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('../../models/userModel');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Getting user information
router.get('/', (req, res, next) => {
    let token = req.headers.token; // Token set in frontend
    // console.log(token)
    jwt.verify(token, 'secretkey', (err, decoded) => {
        console.log(decoded); // Add this line
        if (err) return res.status(401).json({
            title: 'Unauthorised'
        })
        console.log('decoded user: ', decoded.userId)
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            // console.log(user.email)
            // console.log(user.email)
            return res.status(200).json({
                title: 'User grabbed',
                user
            })
        })
    })
})

module.exports = router;