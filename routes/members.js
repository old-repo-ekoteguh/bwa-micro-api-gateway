const express = require('express');
const router = express.Router();

const membersHandler = require('../handlers/members');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', membersHandler.register);
router.post('/login', membersHandler.login);
router.put('/', verifyToken, membersHandler.update);

module.exports = router;
