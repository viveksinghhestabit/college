const express = require("express");
const router = express.Router();
const showcaseController = require("../controllers/showcaseController");

// Define routes for usersdata
router.get("/", showcaseController.getAllShowcaseData);
router.get("/:id", showcaseController.getShowcaseDataById);
router.post("/", showcaseController.createShowcaseData);
router.put("/:id", showcaseController.updateShowcaseData);
router.delete("/:id", showcaseController.deleteShowcaseData);

module.exports = router;
