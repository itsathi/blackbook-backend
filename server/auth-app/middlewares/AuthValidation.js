// filepath: /auth-app/auth-app/middlewares/AuthValidation.js
const { body, validationResult } = require('express-validator');

// User validation
const userRegistrationValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
const userLoginValidation = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Admin validation
const adminRegistrationValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
const adminLoginValidation = [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Exported validation result checkers
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

module.exports = {
    userRegistrationValidation,
    userLoginValidation,
    adminRegistrationValidation,
    adminLoginValidation,
    validate,
};