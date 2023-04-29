// Import the User and Thought models
const { User, Thought } = require('../models');

// Define the ThoughtController object with its methods
const ThoughtController = {
  // Method to get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to get a thought by its ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      // Update the user's thoughts array with the new thought
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to update a thought
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to delete a thought
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to create a new reaction for a thought
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to delete a reaction from a thought
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

// Export the ThoughtController object
module.exports = ThoughtController;
