const College = require("../models/college");

const reviewsController = {
  getAllReviews: async (req, res) => {},

  getReviewById: async (req, res) => {
    // Implement logic to get a user by ID
  },

  createReview: async (req, res) => {
    // Implement logic to create a new user
    try {
      const { stars, feedback, name, email, isVisible } = req.body;
      const collegeObj = await College.findOne({ _id: req.params.id });
      collegeObj.reviews.push({ stars, feedback, name, email, isVisible });
      await collegeObj.save();
      return res.status(200).json({ message: "Review added" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  updateReview: async (req, res) => {
    // Implement logic to update a user
    try {
      const { reviewId, isVisible } = req.body;
      const collegeObj = await College.findOne({ _id: req.params.id });
      const reviewObj = collegeObj?.reviews[reviewId];
      reviewObj.isVisible = isVisible;
      collegeObj.reviews[reviewId] = reviewObj;
      await collegeObj.save();
      return res.status(200).json({ message: "Review updated" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  },

  deleteReview: async (req, res) => {
    // Implement logic to delete a user
  },
};

module.exports = reviewsController;
