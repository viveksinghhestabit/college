const State = require("../models/state");

const stateController = {
  getAllStates: async (req, res) => {
    try {
      const states = await State.find();
      res.status(200).json({ message: "All States", data: states });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getStateById: async (req, res) => {
    try {
      const state = await State.findById(req.params.id);
      return res.status(200).json({ message: "Single state", data: state });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createState: async (req, res) => {
    try {
      const { name, coverImage } = req.body;
      const stateObj = new State({
        name,
        coverImage,
      });
      await stateObj.save();
      return res.status(200).json({ message: "State created" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateState: async (req, res) => {
    try {
      await State.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({ message: "State Updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteState: async (req, res) => {
    try {
      await State.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "State Deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = stateController;
