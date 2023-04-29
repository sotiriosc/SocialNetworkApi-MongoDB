const User = require('../models/User');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      // BONUS: Remove associated thoughts
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = UserController;
