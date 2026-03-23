const User = require("../models/user");

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phoneNumber: user.phoneNumber,
  neetScore: user.neetScore,
  preferredState: user.preferredState,
  preferredCollege: user.preferredCollege,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const userController = {
  signup: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        phoneNumber,
        neetScore,
        preferredState,
        preferredCollege,
      } = req.body;

      if (!name || !email || !password || !phoneNumber) {
        return res.status(400).json({
          message: "Name, email, phone number and password are required",
        });
      }

      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const newUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        phoneNumber: phoneNumber.trim(),
        neetScore:
          neetScore === "" || neetScore === null || neetScore === undefined
            ? null
            : Number(neetScore),
        preferredState: preferredState || "",
        preferredCollege: preferredCollege || "",
      });

      return res.status(201).json({
        message: "Signup successful",
        user: sanitizeUser(newUser),
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      return res.status(200).json({
        message: "Login successful",
        user: sanitizeUser(user),
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ data: users.map(sanitizeUser) });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user: sanitizeUser(user) });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createUser: async (req, res) => {
    return userController.signup(req, res);
  },

  updateUser: async (req, res) => {
    try {
      const payload = { ...req.body };
      if (payload.email) {
        payload.email = payload.email.toLowerCase().trim();
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, payload, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User updated",
        user: sanitizeUser(updatedUser),
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
