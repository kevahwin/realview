const mongoose = require('mongoose');

const userUploadSchema = new mongoose.Schema({
    objectUrl: String,
});

const User = mongoose.model('User', userUploadSchema);

module.exports = User;