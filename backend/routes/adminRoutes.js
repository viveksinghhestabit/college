const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Public routes
router.post("/login", adminController.login);

// Protected routes (you can add authentication middleware here)
router.get("/", adminController.getAllAdmins);
router.get("/:id", adminController.getAdminById);
router.post("/", adminController.createAdmin);
router.put("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

module.exports = router;
