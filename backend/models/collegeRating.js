const mongoose = require("mongoose");

const collegeRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

collegeRatingSchema.index({ userId: 1, collegeId: 1 }, { unique: true });

const CollegeRating = mongoose.model("CollegeRating", collegeRatingSchema);

module.exports = CollegeRating;
