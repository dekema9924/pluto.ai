const Userdb = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/sendEmail');
const tokenDb = require('../../models/tokenModel')



module.exports = signIn = async (req, res) => {
    const { email, password } = req.body

    //make sure meail and password exist 

    if (!email || !password) {
        return res.status(400).json({ message: 'empty fields' })
    }


    //check if email exist
    const userExist = await Userdb.findOne({ email })

    if (!userExist) return res.status(400).json({ message: 'Invalid credentials' })

    // compare hash password
    bcrypt.compare(password, userExist.password, async function (err, result) {
        if (err) {
            console.error('bcrypt error:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (!result) return res.status(400).json({ message: 'Invalid credentials' });

        //  BLOCK login if user is not verified
        if (!userExist.isVerified) {
            //create token to verify account
            const newToken = await tokenDb.create({
                userId: userExist._id,
                token: Math.floor(100000 + Math.random() * 900000).toString()

            })
            await newToken.save()

            //create url
            const actionUrl = `${process.env.NODE_ENV == 'production' ? process.env.PRODURL : process.env.BASEURL}/auth/${userExist._id}/verify/${newToken.token}`
            //send email

            sendEmail(
                userExist.email,
                "Verify Your Email",
                "Click the button below to verify your account.", // ← this is `text`
                actionUrl,
                userExist.name
            );
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