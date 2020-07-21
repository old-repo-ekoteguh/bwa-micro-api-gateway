const apiAdapter = require('../../adapters/Api');

const {
    URL_MEMBER_SERVICE,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_MEMBER_SERVICE);
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token;
        const email = req.body.email;

        if (!refreshToken || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid token'
            });
        }

        await api.get('/refresh_tokens', { params: { refresh_token: refreshToken }});

        // If refresh_token found
        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                });
            }
            // Cek jika emailnya sama
            if (email !== decoded.data.email) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email is not valid'
                });
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
            return res.json({
                status: 'success',
                data: {
                    token
                }
            });
        })
    
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'Service unavailable'
            })
        }

        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data);
    }
}