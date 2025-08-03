require('dotenv').config()
require('./config/mongoose')
const express = require('express')
const app = express()
const port = 3000
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const apiRouter = require('./routes/apiRoutes')
const dashboardRouter = require('./routes/Dashboard')



//cors config
const allowedOrigins = [
    'http://localhost:5173',
    'https://plutoa1.netlify.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true // allow cookies to be sent
}));

//middlewares
app.use(cookieParser())
app.use(express.json()) //parse json
app.use(express.urlencoded({ extended: true }))
app.use('/auth', userRouter)
app.use('/api', apiRouter)
app.use('/dashboard', dashboardRouter)



//open server
app.listen(port, () => {
    console.log(`server open on port ${port}`)
})


//test route
app.get('/', (req, res) => {
    res.send('open server')
})


