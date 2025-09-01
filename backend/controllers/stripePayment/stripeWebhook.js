const stripe = require('stripe')(process.env.STRIPESECRETKEY);
const Payment = require('../../models/paymentModel');
const User = require('../../models/UserModel');

const stripeWebhook = async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    console.log('webhook route hit');

    if (!endpointSecret) {
        console.error(" Missing STRIPE_WEBHOOK_SECRET in env.");
        return res.sendStatus(500);
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error(' Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    let subscriptionId;

    // Extract subscription ID based on event type
    switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
            subscriptionId = event.data.object.id;
            break;

        case 'checkout.session.completed':
        case 'invoice.payment_succeeded':
            subscriptionId = event.data.object.subscription;
            break;

        default:
            subscriptionId = null;
    }

    if (!subscriptionId) {
        console.warn('No subscription ID found for event type:', event.type);
        return res.status(400).send('No subscription ID found');
    }

    let subscription;
    try {
        subscription = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ['items.data.price'],
        });
    } catch (stripeErr) {
        console.error('Stripe API error:', stripeErr);
        return res.status(400).send(`Stripe API error: ${stripeErr.message}`);
    }

    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                console.log(`Subscription status is ${subscription.status}.`);

                // Find user by Stripe customer ID (make sure you store stripeCustomerId in your User model)
                const user = await User.findOne({ stripeCustomerId: subscription.customer });
                if (!user) {
                    console.warn(`User with Stripe customer ID ${subscription.customer} not found`);
                    break;
                }

                // Convert timestamps (Stripe returns seconds, JS Date needs ms)
                const currentPeriodEnd = subscription.current_period_end
                    ? new Date(subscription.current_period_end * 1000)
                    : null;
                const currentPeriodStart = subscription.current_period_start
                    ? new Date(subscription.current_period_start * 1000)
                    : null;

                // Grab price and currency from subscription items
                const priceData = subscription.items?.data[0]?.price;
                const priceAmount = priceData ? priceData.unit_amount / 100 : null;
                const currency = priceData ? priceData.currency.toUpperCase() : null;


                console.log('Stripe subscription current_period_start:', subscription.current_period_start);
                console.log('Stripe subscription current_period_end:', subscription.current_period_end);

                // Upsert Payment record
                const newPayment = await Payment.findOneAndUpdate(
                    { stripeSubscriptionId: subscription.id },
                    {
                        user: user._id,
                        stripeSubscriptionId: subscription.id,
                        priceId: priceData?.id || null,
                        status: subscription.status,
                        currentPeriodEnd,
                        currentPeriodStart,
                        currency,
                        amount: priceAmount,
                    },
                    { upsert: true, new: true }
                );

                await newPayment.save();

                console.log('Updated payment:', subscription);
                break;

            case 'customer.subscription.deleted':
                console.log(`Subscription deleted with status: ${subscription.status}`);

                await Payment.findOneAndUpdate(
                    { stripeSubscriptionId: subscription.id },
                    { status: 'canceled' }
                );
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    } catch (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).send('Internal Server Error');
    }

    res.status(200).send(); // Acknowledge receipt
};

module.exports = stripeWebhook;
