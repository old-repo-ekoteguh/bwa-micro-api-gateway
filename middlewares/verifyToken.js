const jwt = require('jsonwebtoken');
const {
    JWT_SECRET
} = process.env;

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: err.message
            });
        }

        req.member = decoded;
        return next();
    })
}