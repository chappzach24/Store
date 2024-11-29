// routes/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId/items', cartController.addToCart);
router.put('/cart/:userId/items/:productId', cartController.updateCartItem);
router.delete('/cart/:userId/items/:productId', cartController.removeFromCart);
router.delete('/cart/:userId', cartController.clearCart);

module.exports = router;