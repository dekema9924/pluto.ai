require('../config/cloudinary')

const express = require('express')
const signUp = require('../controllers/auth/signUp')
const signIn = require('../controllers/auth/signIn')
const verifyToken = require('../middleware/verifyToken')
const Profile = require('../controllers/auth/Profile')
const signOut = require('../controllers/auth/signOut')
const uploadProfileImage = require('../controllers/auth/uploadProfileImage')
const userRouter = express.Router()
const multer = require('multer')
const resetPassword = require('../controllers/auth/resetPassword')
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Check if the file is an image
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Please upload an image file'), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // Limit file size to 10MB
    }
})

userRouter.get('/', (req, res) => {
    res.send('user routes')
})

//signup
userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn)
userRouter.get('/profile', verifyToken, Profile)
userRouter.post('/signout', verifyToken, signOut)
userRouter.post('/uploadprofile', verifyToken, upload.single('avatar'), uploadProfileImage)
userRouter.post('/resetpassword', verifyToken, resetPassword)

module.exports = userRouter