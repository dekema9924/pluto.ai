// models/paymentModel.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stripeSubscriptionId: {
    type: String,
    required: true,
    unique: true,
  },
  priceId: String,
  amount: Number,
  currency: String,
  status: {
    type: String,
    enum: ['active', 'canceled', 'past_due', 'incomplete', 'unpaid'],
  },
  currentPeriodStart: Date,
  currentPeriodEnd: Date,
}, { timestamps: true });


module.exports = mongoose.model('Payment', paymentSchema);
