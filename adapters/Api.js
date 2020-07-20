const axios = require('axios');
const SET_TIMEOUT = process.env;

module.exports = (baseUrl) => {
    return axios.create({
        baseUrl: baseUrl,
        timeout: SET_TIMEOUT
    })
}