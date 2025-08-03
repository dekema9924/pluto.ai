const Userdb = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');



module.exports = signIn = async (req, res) => {
    const { email, password } = req.body

    //check if email exist
    const userExist = await Userdb.findOne({ email })

    if (!userExist) return res.status(400).json({ message: 'Invalid credentials' })

    // compare hash password
    bcrypt.compare(password, userExist.password, function (err, result) {
        if (err) {
            console.error('bcrypt error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (!result) return res.status(400).json({ message: 'Invalid credentials' });

        //  BLOCK login if user is not verified
        if (!userExist.isVerified) {
            return res.status(401).json({
                message: 'Please verify your email before signing in.',
                user: {
                    _id: userExist._id,
                    email: userExist.email,
                    isVerified: false
                }
            });
        }

        //  Generate JWT and set cookie
        const jwtToken = jwt.sign(
            { userId: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: 'Login success',
            user: {
                _id: userExist._id,
                email: userExist.email,
                isVerified: userExist.isVerified
            }
        });
    });

}