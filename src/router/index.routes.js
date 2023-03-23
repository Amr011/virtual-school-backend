const express = require('express');
const router = express.Router();

const userRouter = require('./user');

// User Router
router.use('/user', userRouter);

module.exports = router;
