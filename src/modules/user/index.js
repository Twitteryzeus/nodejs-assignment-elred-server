const express = require('express');
const router = express.Router();
const userService = require('./services');

// Add User Routes
router.post('/create', userService.create);
router.post('/login-otp', userService.loginOtp);

module.exports = router;