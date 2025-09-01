const stripe = require('stripe')(process.env.STRIPESECRETKEY);
const User = require('../../models/UserModel')
const Paymentdb = require('../../models/paymentModel')


const makePayment = async (req, res) => {
    const redirectUrl = process.env.NODE_ENV === "production" ? 'https://plutoa1.netlify.app' : 'http://localhost:5173';
    try {
        // Check if user already has an active subscription
        const findPayment = await Paymentdb.findOne({ user: req.user.userId });
        if (findPayment && findPayment.status === 'active') {
            return res.status(400).json({
                error: 'You already have an active subscription'
            });
        }

        // Find the user from your DB (you need the user ID or email in req.body or session)
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        let stripeCustomerId = user.stripeCustomerId;
        if (!stripeCustomerId) {
            // Create Stripe customer if not exists
            const customer = await stripe.customers.create({
                email: user.email,
                name: user.name,
            });
            stripeCustomerId = customer.id;
            user.stripeCustomerId = stripeCustomerId;
            await user.save();
        }

        // Get price ID
        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
        });

        // Create checkout session with existing customer ID
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${redirectUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${redirectUrl}/cancel`,
        });

        res.status(200).json({ url: session.url });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'payment failed' });
    }
};

module.exports = makePayment;
