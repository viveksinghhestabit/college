const mongoose = require("mongoose");

const showcaseSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

const Showcase = mongoose.model("Showcase", showcaseSchema);

module.exports = Showcase;
