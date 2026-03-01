const express = require("express");
const stateController = require("../controllers/stateController");
const router = express.Router();

// Define routes for users
router.get("/", stateController.getAllStates);
router.get("/:id", stateController.getStateById);
router.post("/", stateController.createState);
router.put("/:id", stateController.updateState);
router.delete("/:id", stateController.deleteState);

module.exports = router;
