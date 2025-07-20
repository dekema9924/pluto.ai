

module.exports = SignOut = (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
    });
    res.status(200).json({ message: "Logged out successfully" });

}