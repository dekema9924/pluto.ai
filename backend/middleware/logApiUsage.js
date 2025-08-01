const apiDb = require('../models/apiModel')
const mongoose = require('mongoose')

/**
 * Middleware to log API usage for a specific AI feature.
 * @param {string} type - One of: 'write_article', 'image_generation', 'background_removal', 'resume_review'
 */
const logApiUsage = (type) => {
    return async (req, res, next) => {

        try {
            if (!req.user.userId) {
                return next(); // skip logging if no user is present
            }
            const userIdString = String(req.user.userId);
            user: new mongoose.Types.ObjectId(userIdString)

            await apiDb.create({
                user: new mongoose.Types.ObjectId(userIdString),
                type,
            });

            next();
        } catch (error) {
            console.error('Error logging API usage:', error);
            next(); // Don't block the main route if logging fails
        }
    };
};

module.exports = logApiUsage;
