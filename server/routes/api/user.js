const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('../../models/userModel');

const router = express.Router();

// Getting user information
router.get('/', (req, res, next) => {
    let token = req.headers.token; // Token set in frontend
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Unauthorised'
        })
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'User grabbed',
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        })
    })
})

module.exports = router;