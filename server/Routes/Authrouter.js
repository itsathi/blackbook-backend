const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/Authcontroller');
const { signupValidationSchema, loginValidationSchema, validateBody } = require('../middlewares/AuthValidation');

router.post('/signup', validateBody(signupValidationSchema), signup);
router.post('/login', validateBody(loginValidationSchema), login);

module.exports = router;