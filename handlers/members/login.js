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
        const member = await api.post('/members/login', req.body);
        const data = member.data.data;

        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
        const refreshToken = jwt.sign({
            data
        }, JWT_SECRET_REFRESH_TOKEN, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRED
        });

        await api.post('/refresh_tokens', { refresh_token: refreshToken, member_id: data.id });

        return res.json({
            status: 'success',
            data: {
                token,
                refresh_token: refreshToken
            }
        });
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