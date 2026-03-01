const University = require("../models/university");

const universityController = {
  getAllUniversities: async (req, res) => {
    try {
      const universities = await University.find();
      return res
        .status(200)
        .json({ data: universities, message: "All universities" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getUniversityById: async (req, res) => {
    // Implement logic to get a user by ID
    try {
      const university = await University.findById(req.params.id);
      return res
        .status(200)
        .json({ data: university, message: "University by id" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createUniversity: async (req, res) => {
    // Implement logic to create a new user
    try {
      const {
        fullName,
        logo,
        coverpic,
        description,
        gallery,
        reviews,
        state,
        city,
        pincode,
        website,
        phone,
        address,
        status,
        yearOfEstabilish,
        universityType,
      } = req.body;

      const universityObj = new University({
        fullName,
        logo,
        coverpic,
        description,
        gallery,
        reviews,
        state,
        city,
        pincode,
        website,
        phone,
        address,
        status,
        yearOfEstabilish,
        universityType,
      });

      await universityObj.save();
      return res.status(200).json({ message: "University added successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateUniversity: async (req, res) => {
    // Implement logic to update a user
    try {
      const universityData = await University.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return res.status(200).json({ message: "University updated" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteUniversity: async (req, res) => {
    // Implement logic to delete a user
    try {
      await University.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "University deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = universityController;
