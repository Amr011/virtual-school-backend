const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

const { validateToken } = require('../middleware/auth');

// User Profile
router.route('/').get(userController.userProfile);

// User Register
router.route('/register').post(userController.userRegister);

// User Loggin
router.route('/login').post(userController.userLogin);

// User Logout
router.route('/logout').post(validateToken, userController.userLogout);

module.exports = router;
