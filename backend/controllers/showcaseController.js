const Showcase = require("../models/showcase");

const showcaseController = {
  getAllShowcaseData: async (req, res) => {
    try {
      const showcaseData = await Showcase.find();
      res.status(200).json({
        data: showcaseData,
        message: "All showcase data",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getShowcaseDataById: async (req, res) => {
    // Implement logic to get a user by ID
    try {
      const showcaseData = await Showcase.findById(req.params.id);
      res.status(200).json({
        data: showcaseData,
        message: "Showcase data by id",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createShowcaseData: async (req, res) => {
    // Implement logic to create a new user
    try {
      const { image, title, subtitle } = req.body;
      const showcaseDataObj = new Showcase({
        image,
        title,
        subtitle,
      });
      await showcaseDataObj.save();
      return res.status(200).json({ message: "Showcase data added" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateShowcaseData: async (req, res) => {
    const data = req.body;

    try {
      await Showcase.findByIdAndUpdate(req.params.id, data);
      return res.status(200).json({ message: "Showcase data Updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteShowcaseData: async (req, res) => {
    // Implement logic to delete a user
    try {
      await Showcase.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Showcase data deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = showcaseController;
