const axios = require('axios');
const { SET_TIMEOUT } = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: parseInt(SET_TIMEOUT)
    })
}