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

    name: String,
    stripeCustomerId: {
        type: String,
        unique: true,
        sparse: true
    },
    stripeStatus: {
        type: String,
        default: 'inactive'
    }
});

module.exports = mongoose.model('User', userSchema);
