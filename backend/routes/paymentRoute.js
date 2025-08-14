const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const makePayment = require('../controllers/stripePayment/makePayment')
const stripeWebhook = require('../controllers/stripePayment/stripeWebhook')
const paymentRoute = express.Router()




paymentRoute.post('/create-checkout-session', verifyToken, makePayment)

// paymentRoute.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook)



module.exports = paymentRoute