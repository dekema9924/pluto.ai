const bcrypt = require('bcryptjs');
const Userdb = require('../../models/UserModel');
const validator = require('validator')

const resetPassword = async (req, res) => {
    const { new_password, confirm_password } = req.body;
    const userId = req.user.userId


    if (new_password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    //validate email & password
    if (!validator.isStrongPassword(confirm_password)) {
        return res.status(400).json({ message: 'weak password' })
    }

    const findUser = await Userdb.findById(userId)

    bcrypt.compare(confirm_password, findUser.password, function (err, result) {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }
        if (result) return res.status(400).json({ message: "New password cannot be the same as the old password" });

        //hash and save new password
        bcrypt.hash(confirm_password, 10, function (err, hash) {
            if (err) {
                return res.status(500).json({ message: "Error hashing password" });
            }
            Userdb.findByIdAndUpdate(userId, { password: hash }, { new: true })
                .then(user => {
                    if (!user) {
                        return res.status(404).json({ message: "User not found" });
                    }
                    return res.status(200).json({ message: "Password reset successfully" });
                })
                .catch(error => {
                    console.error("Error updating password:", error);
                    return res.status(500).json({ message: "Error updating password" });
                });
        });


    });




}


module.exports = resetPassword;