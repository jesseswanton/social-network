const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

// Create a new user
router.post('/', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

//Update user
router.put('/:userId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Delete user
router.delete('/:userId', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Add a friend to the user’s friend list
router.put('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) return res.status(404).json({ message: 'User or friend not found' });

    user.friends.push(friend);
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete a friend from the user’s friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const friendIndex = user.friends.indexOf(req.params.friendId);
      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found in user\'s friend list' });
      }
  
      user.friends.splice(friendIndex, 1);
      await user.save();
  
      res.json({ message: 'Friend removed successfully', user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;