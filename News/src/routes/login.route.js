const express = require('express');
const router = express.Router();
const UserController = require('../controllers/login.controller');

router.post('/', UserController.loginUser);

module.exports = router;