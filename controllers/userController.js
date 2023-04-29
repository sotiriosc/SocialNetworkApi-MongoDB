// Import the User model
const User = require('../models/User');

// Define the UserController object with its methods
const UserController = {
  // Method to get all users
  getAllUsers: async (req, res) => {
    try {
      // Find all users and populate their thoughts and friends
      const users = await User.find().populate('thoughts friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to get a user by their ID
  getUserById: async (req, res) => {
    try {
      // Find user by ID and populate their thoughts and friends
      const user = await User.findById(req.params.id).populate('thoughts friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to create a new user
  createUser: async (req, res) => {
    try {
      // Create a new user with the provided data
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to update a user
  updateUser: async (req, res) => {
    try {
      // Update the user by ID with the provided data, return the updated user
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to delete a user
  deleteUser: async (req, res) => {
    try {
      // Delete the user by ID
      const user = await User.findByIdAndDelete(req.params.id);
      // BONUS: Remove associated thoughts
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Method to add a friend to a user
  addFriend: async (req, res) => {
    try {
      // Update the user by adding a friend to the friends array
      const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
  // Method to remove a friend from a user
  removeFriend: async (req, res) => {
    try {
      // Update the user by removing a friend from the friends array
      const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

// Export the UserController object
module.exports = UserController;
