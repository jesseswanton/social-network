const express = require('express');
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');
const router = express.Router();

// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        if (!req.body.reactionBody || !req.body.username) {
            return res.status(400).json({ message: 'Reaction body and username are required' });
        }
  
        const reaction = new Reaction({
            reactionBody: req.body.reactionBody,
            username: req.body.username,
      });
  
      await reaction.save();
  
      const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
  
        thought.reactions.push(reaction);
  
        await thought.save();
  
        res.status(201).json(reaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });

// Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
  
    const reactionIndex = thought.reactions.indexOf(req.params.reactionId);
        if (reactionIndex === -1) {
            return res.status(404).json({ message: 'Reaction not found on this thought' });
        }
  
      thought.reactions.pull(req.params.reactionId);
        await thought.save();
  
        await Reaction.findByIdAndDelete(req.params.reactionId);
  
        res.status(200).json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
