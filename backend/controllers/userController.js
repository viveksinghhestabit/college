const User = require("../models/user");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({ data: users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    // Implement logic to create a new user
  },

  updateUser: async (req, res) => {
    // Implement logic to update a user
  },

  deleteUser: async (req, res) => {
    // Implement logic to delete a user
  },
};

module.exports = userController;
