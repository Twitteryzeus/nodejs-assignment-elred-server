const express = require('express');
const router = express.Router();
const userService = require('./services');

// Add User Routes
router.post('/create', userService.create);

module.exports = router;