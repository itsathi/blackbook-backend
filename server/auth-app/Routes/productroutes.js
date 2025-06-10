const express = require('express');
const router = express.Router();
const {
  uploadProduct,
  getAllProducts,
  getProductById,
  getAllBeats,
  getAllSamplePacks
} = require('../controllers/productController');

const { authenticateToken, authorizeAdmin } = require('../middlewares/AuthMiddleware');
const { productUploader } = require('../middlewares/uploadMiddleware');

// Admin upload
router.post(
  '/upload',
  authenticateToken,
  authorizeAdmin,
  productUploader,
  uploadProduct
);

// Public product access
router.get('/', getAllProducts);               // All products
router.get('/beats', getAllBeats);             // Only beats
router.get('/samplepacks', getAllSamplePacks); // Only sample packs
router.get('/:id', getProductById);            // Single product

module.exports = router;
