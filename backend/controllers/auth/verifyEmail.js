const Userdb = require('../../models/UserModel')
const Tokendb = require('../../models/tokenModel')


const verifyEmail = async (req, res) => {
    const { token, id } = req.params

    try {
        const findUser = await Userdb.findById(id)
        if (!findUser) return res.status(404).json("invalid link")

        //check if token exists
        const checkToken = await Tokendb.findOne({
            userId: findUser._id,
            token: token
        })
        if (!checkToken) return res.status(404).json('invalid link')
        //update and verify email
        findUser.isVerified = true;
        await findUser.save();

        //delete token
        await checkToken.deleteOne()
        res.status(200).json({ message: 'email verified successfully' })

    } catch (err) {
        res.status(500).json({ message: 'internal error' })
        console.error(err)
    }



}

module.exports = verifyEmail