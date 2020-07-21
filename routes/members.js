const express = require('express');
const router = express.Router();

const membersHandler = require('../handlers/members');

router.post('/register', membersHandler.register);
router.post('/login', membersHandler.login);

module.exports = router;
