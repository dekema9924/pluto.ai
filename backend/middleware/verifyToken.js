const jwt = require('jsonwebtoken');

module.exports = verifyToken = (req, res, next) => {
    const token = req.cookies?.token; // Use 'cookies' with cookie-parser

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
