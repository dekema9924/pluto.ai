
const express = require('express')
const apiUsage = require('../controllers/dashboard/apiUsage')
const verifyToken = require('../middleware/verifyToken')
const dashboardRouter = express.Router()


///middleware
dashboardRouter.use(verifyToken)



//routes
dashboardRouter.get('/', (req, res) => {
    res.send('hey')
})
dashboardRouter.get('/stats', apiUsage)




module.exports = dashboardRouter