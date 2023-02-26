const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        unique: true,
        type: String
    },
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;