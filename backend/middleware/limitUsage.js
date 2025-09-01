const apiDb = require('../models/apiModel')
const paymentDb = require('../models/paymentModel')


//block unpaid user from using api after 3 api calls
const limitUsage = (requestedType) => {
   return async (req, res, next) => {
      const userId = req.user.userId

      if (!userId) return res.status(400).json({ message: 'you need to be logged in.' })

      //count users api usage
      try {
         const totalNonImageUsage = await apiDb.countDocuments({
            user: userId,
            type: { $ne: 'image-generation' }
         });

         const imageUsage = await apiDb.countDocuments({
            user: userId,
            type: 'image-generation'
         });

         //check if user has an active subscription
         const payment = await paymentDb.findOne({ user: userId, status: 'active' });
         if (payment) {
            return next(); // User has an active subscription, allow access
         }

         //limit free users to 3 non image generation requests and 1 image generation request

         if (imageUsage >= 1 && requestedType === 'image-generation') {
            return res.status(400).json({ message: 'Free image generation limit reached. Please subscribe to continue.' });
         }

         if (totalNonImageUsage >= 3 && requestedType !== 'image-generation') {
            return res.status(400).json({ message: 'Free usage limit reached. Please subscribe to continue.' });
         }
         next()

      } catch (err) {
         console.error('api limit reached:', err);
         res.status(500).json({ message: 'subscribe to continue' });
      }

   }


}

module.exports = limitUsage