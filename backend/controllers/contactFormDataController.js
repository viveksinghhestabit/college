const ContactFormData = require("../models/contactFormData");

const contactFormDataController = {
  getAllContactFormData: async (req, res) => {
    try {
      const contactFormData = await ContactFormData.find();
      res
        .status(200)
        .json({ message: "All contact form data", data: contactFormData });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getContactFormDataById: async (req, res) => {
    // Implement logic to get a user by ID
  },

  createContactFormData: async (req, res) => {
    // Implement logic to create a new user
    try {
      const {
        fullName,
        phone,
        email,
        message,
        source,
        joinAs,
        designation,
        firmName,
        institutionName,
        courseDetails,
        exam,
      } = req.body;
      const contactFormDataObj = new ContactFormData({
        fullName,
        phone,
        email,
        message,
        source,
        joinAs,
        designation,
        firmName,
        institutionName,
        courseDetails,
        exam,
      });
      await contactFormDataObj.save();
      return res.status(200).json({ message: "Contact form data added" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateContactFormData: async (req, res) => {
    // Implement logic to update a user
  },

  deleteContactFormData: async (req, res) => {
    // Implement logic to delete a user
    try {
      await ContactFormData.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Contact form data deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = contactFormDataController;
