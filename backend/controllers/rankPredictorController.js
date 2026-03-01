const RankPredictor = require("../models/rankPredictor");

const rankPredictorController = {
  getAllRankPredictor: async (req, res) => {
    try {
      const rankPredictor = await RankPredictor.find();
      res
        .status(200)
        .json({ message: "All contact form data", data: rankPredictor });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getRankPredictorById: async (req, res) => {
    // Implement logic to get a user by ID
  },

  createRankPredictor: async (req, res) => {
    // Implement logic to create a new user
    try {
      const { name, phone, gender, category, score, rank } = req.body;
      const rankPredictorObj = new RankPredictor({
        name,
        phone,
        gender,
        category,
        score,
        rank,
      });
      await rankPredictorObj.save();
      return res.status(200).json({ message: "Contact form data added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateRankPredictor: async (req, res) => {
    // Implement logic to update a user
  },

  deleteRankPredictor: async (req, res) => {
    // Implement logic to delete a user
    try {
      await RankPredictor.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Contact form data deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = rankPredictorController;
