const express = require('express');
const router = express.Router();

const membersHandler = require('../handlers/members');

router.post('/register', membersHandler.register);

module.exports = router;
