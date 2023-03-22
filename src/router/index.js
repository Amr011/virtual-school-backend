const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

const { validateToken } = require('../middleware/auth');

// User Register
router.route('/api/v1/register').post(userController.userRegister);

// User Loggin
router.route('/api/v1/login').post(userController.userLogin);

// User Logout
router.route('/api/v1/logout').post(validateToken, userController.userLogout);

module.exports = router;
