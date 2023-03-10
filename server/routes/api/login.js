const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const router = express.Router();

router.post('/', (req, res, next) => {
    // Checking if user exists using email address
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: 'user not found',
                error: 'User not found'
            })
        }
        // Checking if password is correct using bcrypt
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                error: 'Incorrect password'
            })
        }
        // If all good, create token and send to frontend
        let token = jwt.sign({ userId: user._id }, 'secretkey',);
        return res.status(200).json({
            title: 'Login success',
            token: token
        })
    })
})

module.exports = router;