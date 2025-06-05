const User = require("../Models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  signupValidationSchema,
  loginValidationSchema,
  validateSchema,
} = require("../middlewares/AuthValidation");

// ✅ Signup Controller
const signup = async (req, res) => {
  try {
    // Validate input using Joi
    const data = await validateSchema(signupValidationSchema, req.body);

    // Check if the email is already registered
    const userExists = await User.findOne({ email: data.email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user object
    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role || "user",
    });

    // Save user to DB
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1d" }
    );

    // Respond
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Login Controller
const login = async (req, res) => {
  try {
    // Validate input using Joi
    const data = await validateSchema(loginValidationSchema, req.body);

    // Check if user exists
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || "1d" }
    );

    // Send successful response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
};
