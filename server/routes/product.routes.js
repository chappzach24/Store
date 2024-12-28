const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');

const storage = multer.diskStorage({});
const upload = multer({ storage });

// Get all products
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/products/category/:category', productController.getProductsByCategory);
router.post('/products', protect, admin, upload.single('image'), productController.createProduct);
router.put('/products/:id', protect, admin, upload.single('image'), productController.updateProduct);
router.delete('/products/:id', protect, admin, productController.deleteProduct);
router.put('/products/:id/stock', protect, admin, productController.updateStock);

module.exports = router;