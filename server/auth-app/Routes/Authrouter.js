// filepath: /auth-app/auth-app/Routes/Authrouter.js
const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/Authcontroller');
const { userRegistrationValidation, userLoginValidation, validate } = require('../middlewares/AuthValidation');
const { authenticateToken } = require('../middlewares/AuthMiddleware');

const router = express.Router();


// User Registration Route
router.post('/register', userRegistrationValidation, validate, registerUser);

// User Login Route
router.post('/login', userLoginValidation, validate, loginUser);

// User Logout Route
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;