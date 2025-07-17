
const express = require('express')
const signUp = require('../controllers/auth/signUp')
const signIn = require('../controllers/auth/signIn')
const userRouter = express.Router()


userRouter.get('/', (req, res) => {
    res.send('user routes')
})

//signup
userRouter.get('/signup', signUp);
userRouter.get('/signin', signIn)

module.exports = userRouter