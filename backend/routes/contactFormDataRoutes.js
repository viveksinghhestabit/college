const express = require("express");
const router = express.Router();
const contactFormDataController = require("../controllers/contactFormDataController");

// Define routes for users
router.get("/", contactFormDataController.getAllContactFormData);
router.get("/:id", contactFormDataController.getContactFormDataById);
router.post("/", contactFormDataController.createContactFormData);
router.put("/:id", contactFormDataController.updateContactFormData);
router.delete("/:id", contactFormDataController.deleteContactFormData);

module.exports = router;
