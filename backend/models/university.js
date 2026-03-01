const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  logo: {
    type: String,
  },
  coverpic: {
    type: String,
  },
  description: {
    type: String,
  },
  gallery: [],
  reviews: {
    stars: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
  },
  colleges: [],
  yearOfEstabilish: {
    type: String,
  },
  universityType: {
    type: String,
    enum: ["Private", "Government"],
  },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
