const Userdb = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
var validator = require('validator');


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
            await Userdb.create({
                email,
                password: hash,
                name
            });
            return res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Database error:', error);
        }
    });








}