const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String, // for local login
    profileImage: {
        type: String,
        default: ''
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    googleId: String,
    facebookId: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);
