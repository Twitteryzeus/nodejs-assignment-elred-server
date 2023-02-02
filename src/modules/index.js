const express = require('express');
const userRouter = require('./user');
const router = express.Router();

// Register All Modules Router
router.use('/user', userRouter);

module.exports = router;