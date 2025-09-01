const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const makePayment = require('../controllers/stripePayment/makePayment')
const paymentRoute = express.Router()




paymentRoute.post('/create-checkout-session', verifyToken, makePayment)




module.exports = paymentRoute