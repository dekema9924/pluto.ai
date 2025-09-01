const Userdb = require('../../models/UserModel')
const Paymentdb = require('../../models/paymentModel')

module.exports = Profile = async (req, res) => {

    //find user account
    const findUser = await Userdb.findById(req.user.userId).select('-password')

    const findPayment = await Paymentdb.findOne({ user: req.user.userId });

    if (!findUser) return res.status(400).json({ message: ' user does not exist' })
    findUser.stripeStatus = findPayment ? findPayment.status : 'inactive';
    await findUser.save();


    res.status(200).json({ result: findUser })

}


