const Userdb = require('../../models/UserModel')

module.exports = Profile = async (req, res) => {

    //find user account
    const findUser = await Userdb.findById(req.user.userId).select('-password')
    if (!findUser) return res.status(400).json({ message: ' user does not exist' })

    res.status(200).json({ result: findUser })

}


