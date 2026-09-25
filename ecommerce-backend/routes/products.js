const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const apiKeyAuth = require('../middleware/auth');
const { validateProduct } = require('../middleware/validate');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (require ?apiKey=...)
router.post('/', apiKeyAuth, validateProduct, createProduct);
router.put('/:id', apiKeyAuth, validateProduct, updateProduct);
router.delete('/:id', apiKeyAuth, deleteProduct);

module.exports = router;
