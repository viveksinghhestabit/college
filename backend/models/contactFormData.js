const mongoose = require("mongoose");

const contactFormDataSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  source: {
    type: String,
  },
  joinAs: {
    type: String,
  },
  designation: {
    type: String,
  },
  firmName: {
    type: String,
  },
  institutionName: {
    type: String,
  },
  courseDetails: {
    type: String,
  },
  exam: {
    type: String,
  },
});

const ContactFormData = mongoose.model(
  "ContactFormData",
  contactFormDataSchema
);

module.exports = ContactFormData;
