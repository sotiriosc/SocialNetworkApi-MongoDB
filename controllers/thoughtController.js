const { User, Thought } = require('../models');

const ThoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = ThoughtController;
