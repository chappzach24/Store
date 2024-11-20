const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

//Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password');

    res.status(200).json(users);
  }catch (error) {
    res.status(500).json({message: error.message});
  }
});


//Get one user by ID
router.get("/:id", async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
      .select('-password');

    if (!user) {
      return res.status(404).json({message: "user not found"});
    }

    res.status(200).json(user)
  }catch (error){
    if (error.kind === "ObjectId") {
      return res.status(400).json({message: 'invalid user id'})
    }
    res.status(500).json({ message: error.message});
  }
});


// Create user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    if(user) {
      res.status(201).json({
        _id: user._id,
        name: user.username,
        email: user.email
      });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Check if username is being changed and if it already exists
    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username || user.username,
        email: email || user.email,
        // Only update password if provided
        ...(password && { password })
      },
      {
        new: true,          
        runValidators: true 
      }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;