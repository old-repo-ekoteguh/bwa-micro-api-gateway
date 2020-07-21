const apiAdapter = require('../../adapters/Api');

const {
    URL_MEMBER_SERVICE
} = process.env;

const api = apiAdapter(URL_MEMBER_SERVICE);

module.exports = async (req, res) => {
    try {
        const member = await api.post('/members/register', req.body);
        return res.json(member.data);
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