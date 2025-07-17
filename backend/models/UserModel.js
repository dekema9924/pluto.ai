const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String, // for local login
    profileImage: String,
    googleId: String,
    facebookId: String,
    name: String // optional: for profile display
});

module.exports = mongoose.model('User', userSchema);
