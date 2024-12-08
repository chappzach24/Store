const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);

// Protected routes - require authentication
router.get('/profile', protect, userController.getProfile);
router.get('/users', protect, userController.getAllUsers);
router.get('/users/:id', protect, userController.getUserById);
router.put('/users/:id', protect, userController.updateUser);
router.delete('/users/:id', protect, userController.deleteUser);

module.exports = router;