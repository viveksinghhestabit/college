const mongoose = require("mongoose");

const rankPredictorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  category: {
    type: String,
  },
  score: {
    type: String,
  },
  rank: {
    type: String,
  },
});

const RankPredictor = mongoose.model("RankPredictor", rankPredictorSchema);

module.exports = RankPredictor;
