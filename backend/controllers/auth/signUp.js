const Userdb = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
var validator = require('validator');
const tokenDb = require('../../models/tokenModel')
const sendEmail = require('../../utils/sendEmail');



module.exports = signUp = async (req, res) => {
    const { email, password, name } = req.body

    //validate email & password
    if (!validator.isEmail(email) || !validator.isStrongPassword(password)) {
        return res.status(400).json({ message: 'invalid email or password format' })
    }



    //checking if user exist
    const emailExist = await Userdb.findOne({ email })

    if (emailExist) return res.status(400).json({ message: 'email already exist.' })

    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            console.error('Hashing error:', err);
            return;
        }

        try {
            const newUser = await Userdb.create({
                email,
                password: hash,
                name
            });
            await newUser.save()

            //create token to verify account
            const newToken = await tokenDb.create({
                userId: newUser._id,
                token: Math.floor(100000 + Math.random() * 900000).toString()

            })
            await newToken.save()
            console.log(newToken)

            //create url
            const actionUrl = `${process.env.NODE_ENV == 'developement' ? process.env.BASEURL : process.env.PRODURL}/auth/${newUser._id}/verify/${newToken.token}`

            //send email
            sendEmail(
                newUser.email,
                "Verify Your Email",
                "Click the button below to verify your account.", // ← this is `text`
                actionUrl,
                name
            );

            return res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Database error:', error);
        }
    });








}