const express = require('express');
const router = express.Router();

const refreshTokensHandler = require('../handlers/refresh-tokens');

router.post('/', refreshTokensHandler.refreshToken);

module.exports = router;