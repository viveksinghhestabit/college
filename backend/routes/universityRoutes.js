const express = require("express");
const router = express.Router();
const universityControlller = require("../controllers/universityController");

// Define routes for users
router.get("/", universityControlller.getAllUniversities);
router.get("/:id", universityControlller.getUniversityById);
router.post("/", universityControlller.createUniversity);
router.put("/:id", universityControlller.updateUniversity);
router.delete("/:id", universityControlller.deleteUniversity);

module.exports = router;
