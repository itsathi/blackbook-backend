const dotenv = require('dotenv');
const joi = require('joi');
dotenv.config();
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/Authcontroller');
const validator = require('validator');

// Define the signup validation schema using Joi
const signupValidationSchema = joi.object({
  name: joi.string().min(3).max(30).required()
    .messages({
      'string.base': 'Name should be a type of text',
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least 3 characters',
      'string.max': 'Name should have at most 30 characters',
      'any.required': 'Name is required'
    }),
  email: joi.string().email().required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: joi.string().min(6).required()
    .messages({
      'string.min': 'Password should have at least 6 characters',
      'any.required': 'Password is required'
    }),
  role: joi.string().valid('user', 'admin').default('user')
});


// Define the login validation function
const loginValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  password: joi.string().min(6).required().messages({
    'string.min': 'Password should have at least 6 characters',
    'any.required': 'Password is required'
  })
});


// Helper function to validate data against a schema asynchronously
async function validateSchema(schema, data) {
    try {
        // Validate the data using the provided schema
        const value = await schema.validateAsync(data, { abortEarly: false });
        // If validation passes, return the validated value
        return value;
    } catch (error) {
        // If validation fails and there are details, extract messages
        if (error && error.details) {
            const errorMessages = error.details.map(function(detail) {
                return detail.message;
            }).join(', ');
            // Throw a new error with the combined messages
            throw new Error(errorMessages);
        } else {
            // If no details, throw the original error
            throw error;
        }
    }
}

// Middleware function to validate request body using a schema
function validateBody(schema) {
    // Return an async middleware function
    return async function(req, res, next) {
        try {
            // Validate the request body using the schema
            await validateSchema(schema, req.body);
            // If validation passes, proceed to the next middleware
            next();
        } catch (err) {
            // If validation fails, send a 400 response with the error message
            res.status(400).json({ error: err.message });
        }
    };
}

// Export all the modules for use in other files
module.exports = {
    signupValidationSchema: signupValidationSchema,
    loginValidationSchema: loginValidationSchema,
    validateBody: validateBody,
    validateSchema: validateSchema
};