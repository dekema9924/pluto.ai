const stripe = require('stripe')(process.env.STRIPESECRETKEY);
const Userdb = require('../../models/UserModel');


const makePayment = async (req, res) => {
    const redirectUrl = process.env.NODE_ENV === "production" ? 'https://plutoa1.netlify.app' : 'http://localhost:5173'
    console.log(redirectUrl)
    try {

        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
        });

        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,

                },
            ],
            mode: 'subscription',
            success_url: `${redirectUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${redirectUrl}/cancel.html`,
        });

        res.status(200).json({ url: session.url })

    } catch (error) {
        console.error('Error:', err);
        res.status(500).json({ error: 'payment failed' });
    }

};

module.exports = makePayment;
