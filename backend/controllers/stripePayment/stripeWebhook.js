// const stripe = require('stripe')(process.env.STRIPESECRETKEY);
// const Payment = require('../../models/paymentModel');
// const Userdb = require('../../models/UserModel');

// const stripeWebhook = async (req, res) => {
//     const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//     const sig = req.headers['stripe-signature'];
//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//     } catch (err) {
//         console.error('Webhook signature verification failed:', err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     try {
//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;

//             const subscription = await stripe.subscriptions.retrieve(session.subscription);

//             const currentPeriodEnd = subscription.current_period_end
//                 ? new Date(subscription.current_period_end * 1000)
//                 : null;

//             // Find user by userId from metadata
//             const user = await Userdb.findById(session.metadata.userId);

//             if (!user) {
//                 console.error('❌ User not found for ID:', session.metadata.userId);
//                 return res.status(404).send('User not found');
//             }

//             await Payment.create({
//                 user: user._id,
//                 stripeSubscriptionId: subscription.id,
//                 priceId: subscription.items.data[0].price.id,
//                 status: subscription.status,
//                 currentPeriodEnd,
//             });

//             console.log('✅ Subscription saved to DB from checkout.session.completed');
//         }

//         if (event.type === 'invoice.paid') {
//             const invoice = event.data.object;

//             let subscriptionId = invoice.subscription || invoice.parent?.subscription_details?.subscription;

//             if (!subscriptionId) {
//                 console.error('❌ No subscription id found in invoice.paid event');
//                 return res.status(400).send('Missing subscription ID in invoice.paid');
//             }

//             const subscription = await stripe.subscriptions.retrieve(subscriptionId);

//             const currentPeriodEnd = subscription.current_period_end
//                 ? new Date(subscription.current_period_end * 1000)
//                 : null;

//             // Find user by email from invoice.customer_email
//             const user = await Userdb.findOne({ stripeCustomerId: invoice.customer });

//             if (!user) {
//                 console.error('❌ User not found for email:', invoice.customer_email);
//                 return res.status(404).send('User not found');
//             }

//             await Payment.create({
//                 user: user._id,  // use Mongo ObjectId here
//                 stripeSubscriptionId: subscription.id,
//                 priceId: subscription.items.data[0].price.id,
//                 status: subscription.status,
//                 currentPeriodEnd,
//             });

//             console.log('✅ Subscription saved to DB from invoice.paid');
//         }

//         res.json({ received: true });
//     } catch (err) {
//         console.error('❌ Error processing webhook:', err.message);
//         res.status(500).send('Internal server error');
//     }
// };

// module.exports = stripeWebhook;
