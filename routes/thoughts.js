const express = require('express');
const Thought = require('../models/Thought');
const router = express.Router();

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single thought by ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}); 

// Create a new thought
router.post('/', async (req, res) => {
    try {
      const thought = new Thought(req.body);
      await thought.save();
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Update a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true, 
      runValidators: true,
    });

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a thought by ID
router.delete('/:thoughtId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
