const mongoose = require("mongoose");

const applyFormSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  score: {
    type: String,
  },
  category: {
    type: String,
  },
  rank: {
    type: String,
  },
  contact: {
    type: String,
  },
  courseInteresed: {
    type: String,
  },
});

const ApplyForm = mongoose.model("ApplyForm", applyFormSchema);

module.exports = ApplyForm;
