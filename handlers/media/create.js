const apiAdapter = require('../../adapters/Api');

const {
    URL_MEDIA_SERVICE
} = process.env;

const api = apiAdapter(URL_MEDIA_SERVICE);

module.exports = async (req, res) => {
    try {
        const media = await api.post('/media', req.body);
        return res.json(media.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'Service unavailable'
            })
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}