require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./routes/userRoutes')



//middlewares
app.use(express.json()) //parse json
app.use(express.urlencoded({ extended: true }))
app.use('/auth', userRouter)



//open server
app.listen(port, () => {
    console.log(`server open on port ${port}`)
})


//test route
app.get('/', (req, res) => {
    res.send('server')
})


