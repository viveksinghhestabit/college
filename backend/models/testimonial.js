const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  position: {
    type: String,
  },
  photo: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
