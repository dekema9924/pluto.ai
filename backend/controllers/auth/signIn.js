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
            return;
        }
        if (!result) return res.status(400).json({ message: 'invalid credentials' })

        // Create JWT token with a short expiration
        const jwtToken = jwt.sign(
            { userId: userExist._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set secure cookie options
        res.cookie('token', jwtToken, {
            httpOnly: true,         // Prevents JavaScript access (XSS protection)
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS
            sameSite: 'Strict',     // Prevents CSRF in most cases
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        })
            .status(200)
            .json({ message: 'Login success' });
    });

}