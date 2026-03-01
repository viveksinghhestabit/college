const ApplyForm = require("../models/applyForm");

const applyFormController = {
  getAllApplyForm: async (req, res) => {
    try {
      const applyForm = await ApplyForm.find();
      res
        .status(200)
        .json({ message: "All contact form data", data: applyForm });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getApplyFormById: async (req, res) => {
    // Implement logic to get a user by ID
  },

  createApplyForm: async (req, res) => {
    // Implement logic to create a new user
    try {
      const { name, score, category, rank, contact, courseInteresed } =
        req.body;
      const applyFormObj = new ApplyForm({
        name,
        score,
        category,
        rank,
        contact,
        courseInteresed,
      });
      await applyFormObj.save();
      return res.status(200).json({ message: "Apply form data added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateApplyForm: async (req, res) => {
    // Implement logic to update a user
  },

  deleteApplyForm: async (req, res) => {
    // Implement logic to delete a user
    try {
      await ApplyForm.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Apply form data deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = applyFormController;
