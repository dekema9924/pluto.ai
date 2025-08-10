const Userdb = require('../../models/UserModel');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const tokenDb = require('../../models/tokenModel');
const sendEmail = require('../../utils/sendEmail');

const signUp = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Empty fields' });
    }

    if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
        return res.status(400).json({ message: 'Invalid email or password format' });
    }

    const emailExist = await Userdb.findOne({ email });
    if (emailExist) return res.status(400).json({ message: 'Email already exists.' });

    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.error('Hashing error:', err);
            return res.status(500).json({ message: 'Server error during password hashing' });
        }

        try {
            const newUser = await Userdb.create({
                email,
                password: hash,
                name,
            });

            const newToken = await tokenDb.create({
                userId: newUser._id,
                token: Math.floor(100000 + Math.random() * 900000).toString(),
            });

            const actionUrl = `${process.env.NODE_ENV === 'production' ? process.env.PRODURL : process.env.BASEURL}/auth/${newUser._id}/verify/${newToken.token}`;

            await sendEmail(
                newUser.email,
                'Verify Your Email',
                'Click the button below to verify your account.',
                actionUrl,
                name
            );

            return res.status(200).json({ message: 'User created successfully. Verification email sent.' });
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    });
};

module.exports = signUp;

