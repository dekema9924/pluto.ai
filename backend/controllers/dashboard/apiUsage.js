const apiDb = require('../../models/apiModel')
const mongoose = require('mongoose');


const apiUsage = async (req, res) => {
    // console.log('User ID:', req.user.userId);


    try {
        const userIdString = String(req.user.userId);
        user: new mongoose.Types.ObjectId(userIdString)
        const userObjectId = new mongoose.Types.ObjectId(userIdString);

        const stats = await apiDb.aggregate([
            { $match: { user: userObjectId } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);

        res.json(stats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch usage stats' });
    }
}


module.exports = apiUsage