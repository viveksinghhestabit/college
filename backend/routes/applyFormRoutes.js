const express = require("express");
const router = express.Router();
const applyFormController = require("../controllers/applyFormController");

// Define routes for users
router.get("/", applyFormController.getAllApplyForm);
router.get("/:id", applyFormController.getApplyFormById);
router.post("/", applyFormController.createApplyForm);
router.put("/:id", applyFormController.updateApplyForm);
router.delete("/:id", applyFormController.deleteApplyForm);

module.exports = router;
