// filepath: /auth-app/auth-app/Routes/Adminrouter.js
const express = require('express');
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/Admincontroller');
const { adminRegistrationValidation, adminLoginValidation, validate } = require('../middlewares/AuthValidation');
const { authenticateToken, authorizeAdmin } = require('../middlewares/AuthMiddleware');

const router = express.Router();

// Route for admin registration
router.post('/register', adminRegistrationValidation, validate, registerAdmin);

// Route for admin login
router.post('/login', adminLoginValidation, validate, loginAdmin);

// Route for admin logout
router.post('/logout', authenticateToken, authorizeAdmin, logoutAdmin);

module.exports = router;