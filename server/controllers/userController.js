const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const userController = {
  // Login user
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Login attempt with email:', email); // Debug log

      // Find user by email
      const user = await User.findOne({ email });
      console.log('User found:', user ? 'Yes' : 'No'); // Debug log

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch ? 'Yes' : 'No'); // Debug log

        if (isMatch) {
          res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
          });
        } else {
          res.status(401).json({ message: 'Invalid email or password' });
        }
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      res.status(500).json({ message: error.message });
    }
  },

  // Register new user
  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      // Create user (password will be hashed by the pre-save middleware)
      const user = await User.create({
        username,
        email,
        password
      });
  
      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id)
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all users 
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).select('-password');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get single user
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get user profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).select('-password');
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;