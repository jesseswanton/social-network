const express = require('express');
const Reaction = require('../models/Reaction');
const Thought = require('../models/Thought');
const router = express.Router();

// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const reaction = new Reaction(req.body);
    await reaction.save();

    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(reaction);
    await thought.save();

    res.status(201).json(reaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    await Reaction.findByIdAndDelete(req.params.reactionId);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
