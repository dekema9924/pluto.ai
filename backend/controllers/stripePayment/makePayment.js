// const stripe = require('stripe')(process.env.STRIPESECRETKEY);
// const Userdb = require('../../models/UserModel');

// const makePayment = async (req, res) => {
//     const userId = req.user.userId;

//     try {
//         // Create or retrieve a customer ID for this user first
//         let user = await Userdb.findById(userId);

//         let customerId = user.stripeCustomerId;
//         if (!customerId) {
//             // Create a new Stripe customer if user doesn't have one yet
//             const customer = await stripe.customers.create({
//                 email: user.email,
//                 metadata: { userId: user._id.toString() },
//             });
//             customerId = customer.id;

//             // Save customerId to user
//             user.stripeCustomerId = customerId;
//             await user.save();
//         }

//         // Create checkout session using this customer ID
//         const session = await stripe.checkout.sessions.create({
//             mode: 'subscription',
//             payment_method_types: ['card'],
//             customer: customerId, // <---- important
//             line_items: [
//                 {
//                     price: 'price_1RsWsG5QDHWvZzWPPcyKUse7',
//                     quantity: 1,
//                 },
//             ],
//             billing_address_collection: 'auto',
//             success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
//             cancel_url: `http://localhost:5173/cancel`,
//             metadata: { userId: user._id.toString() },
//         });

//         res.json({ url: session.url });
//     } catch (err) {
//         console.error('Error creating Stripe session:', err.message);
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = makePayment;
