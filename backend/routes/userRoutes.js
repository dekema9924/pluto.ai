
const express = require('express')
const signUp = require('../controllers/auth/signUp')
const signIn = require('../controllers/auth/signIn')
const verifyToken = require('../middleware/verifyToken')
const Profile = require('../controllers/auth/Profile')
const userRouter = express.Router()


userRouter.get('/', (req, res) => {
    res.send('user routes')
})

//signup
userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn)
userRouter.get('/profile', verifyToken, Profile)

module.exports = userRouter