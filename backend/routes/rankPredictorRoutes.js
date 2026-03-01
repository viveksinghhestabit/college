const express = require("express");
const router = express.Router();
const rankPredictorController = require("../controllers/rankPredictorController");

// Define routes for users
router.get("/", rankPredictorController.getAllRankPredictor);
router.get("/:id", rankPredictorController.getRankPredictorById);
router.post("/", rankPredictorController.createRankPredictor);
router.put("/:id", rankPredictorController.updateRankPredictor);
router.delete("/:id", rankPredictorController.deleteRankPredictor);

module.exports = router;
