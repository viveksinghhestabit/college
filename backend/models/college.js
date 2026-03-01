const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  fee: {
    type: String,
  },
  specialization: {
    type: String,
  },
});

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
  feedback: {
    type: String,
  },
  stars: {
    type: Number,
  },
});

const tableSchema = new mongoose.Schema({
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",
  },
  tableName: {
    type: String,
  },
  description: {
    type: String,
  },
  noOfColumns: {
    type: Number,
  },
  noOfRows: {
    type: Number,
  },
  columns: [],
  rows: [],
});

const collegeSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
    required: true,
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
  reviews: [reviewSchema],
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
  yearOfEstabilish: {
    type: String,
  },
  university: {
    type: String,
  },
  courses: [courseSchema],
  tables: [tableSchema],
  collegeType: {
    type: String,
    enum: ["Private", "Government"],
  },
});

const Course = mongoose.model("Course", courseSchema);
const College = mongoose.model("College", collegeSchema);
const Review = mongoose.model("Review", reviewSchema);
const Table = mongoose.model("Table", tableSchema);

module.exports = { Review, College, Course, Table };
