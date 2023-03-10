const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// Getting user information
router.get('/', (req, res, next) => {
    let token = req.headers.token; // Token set in frontend
    // console.log(token)
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Unauthorised'
        })
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'User grabbed',
                user
            })
        })
    })
})

module.exports = router;