// filepath: /auth-app/auth-app/controllers/productController.js

const multer = require('multer');
const path = require('path');
const Product = require('../Models/Product'); // Using CommonJS require

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      // Use path.join for robust path construction across OS
      cb(null, path.join(__dirname, '..', 'uploads', 'covers'));
    } else {
      cb(null, path.join(__dirname, '..', 'uploads', 'files'));
    }
  },
  filename: function (req, file, cb) {
    // Append timestamp to avoid name collisions and replace spaces for clean filenames
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage });

// Middleware for handling file uploads (used in productroutes.js)
exports.productUploader = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'productFile', maxCount: 1 }
]);

// --- Product Controller Functions ---

// @desc    Upload new beat or sample pack
// @route   POST /products/upload
// @access  Private (Admin only)
exports.uploadProduct = async (req, res) => {
  try {
    console.log('--- Inside uploadProduct Controller ---');
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);
    console.log('Request User (from token):', req.user); // Should contain { id: ..., role: ... }
    console.log('User ID from token:', req.user ? req.user.id : 'N/A');

    // Destructure properties from req.body.
    // 'category' is now correctly expected from the frontend.
    const { name, description, price, category } = req.body;

    // Basic validation for required files
    if (!req.files || !req.files['coverImage'] || !req.files['productFile']) {
      console.error('File Error: Both coverImage and productFile are required.');
      return res.status(400).json({ error: 'Both coverImage and productFile are required.' });
    }

    // Basic validation for authenticated user (though AuthMiddleware should handle most of this)
    if (!req.user || !req.user.id) {
      console.error('Authentication Error: User not authenticated or ID missing.');
      return res.status(401).json({ error: 'User not authenticated.' });
    }
    // Authorization check (AuthMiddleware.js authorizeAdmin should handle this too)
    if (req.user.role !== 'admin') {
      console.error('Authorization Error: User is not an admin. Role:', req.user.role);
      return res.status(403).json({ error: 'Forbidden: Only admins can upload products.' });
    }

    // Get file paths after Multer has processed them
    const coverImage = req.files['coverImage'][0].path;
    const fileUrl = req.files['productFile'][0].path;

    // Create a new Product instance
    const newProduct = new Product({
      name,
      description,
      price,
      category,      // Using the 'category' from req.body
      coverImage,    // Path to the uploaded cover image
      fileUrl,       // Path to the uploaded product file
      uploadedBy: req.user.id // ID of the admin who uploaded it
    });

    // Save the new product to the database
    await newProduct.save();
    console.log('Product saved successfully:', newProduct);
    res.status(201).json(newProduct);

  } catch (error) {
    console.error('UPLOAD ERROR (Caught in productController):', error);
    // Provide detailed Mongoose validation errors to aid debugging
    if (error.name === 'ValidationError') {
        console.error('Mongoose Validation Error Details:', error.errors);
        return res.status(400).json({
            error: 'Validation failed',
            details: error.errors // This sends detailed validation messages
        });
    }
    // Handle other types of errors
    res.status(500).json({ error: error.message || 'Failed to upload product due to server error' });
  }
};

// @desc    Get all products (for playback & listing)
// @route   GET /products/
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    // Populate 'uploadedBy' to get username if your Admin model has one
    const products = await Product.find().populate('uploadedBy', 'name'); // Assuming 'name' field in Admin model
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// @desc    Get a specific product by ID
// @route   GET /products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('uploadedBy', 'name');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    // Handle invalid ObjectId format specifically
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid product ID format' });
    }
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// @desc    Get all beats (products with category 'beat')
// @route   GET /products/beats
// @access  Public
exports.getAllBeats = async (req, res) => {
  try {
    const beats = await Product.find({ category: 'beat' }).populate('uploadedBy', 'name');
    res.json(beats);
  } catch (err) {
    console.error('Error fetching beats:', err);
    res.status(500).json({ error: 'Error fetching beats' });
  }
};

// @desc    Get all sample packs (products with category 'pack' or 'samplepack')
// @route   GET /products/samplepacks
// @access  Public
exports.getAllSamplePacks = async (req, res) => {
  try {
    // Adjusted to check for both 'pack' and 'samplepack' based on previous discussion
    const samplePacks = await Product.find({ category: { $in: ['pack'] } }).populate('uploadedBy', 'name');
    res.json(samplePacks);
  } catch (err) {
    console.error('Error fetching sample packs:', err);
    res.status(500).json({ error: 'Error fetching sample packs' });
  }
};