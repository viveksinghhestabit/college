const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const reviewsController = require("../controllers/reviewsController");

// Define routes for users
router.get("/", collegeController.getAllColleges);
router.get("/:id", collegeController.getCollegeById);
router.post("/", collegeController.createCollege);
router.put("/:id", collegeController.updateCollege);
router.delete("/:id", collegeController.deleteCollege);
router.post("/filters", collegeController.getCollegesWithFilter);

router.post("/reviews/:id", reviewsController.createReview);
router.put("/reviews/:id", reviewsController.updateReview);

router.post("/course/add", collegeController.addCourse);
router.get("/course/:id", collegeController.getCoursesByCollege);
router.post("/course/delete", collegeController.deleteCourse);

router.post("/table/add", collegeController.addDynamicTable);
router.get("/table", collegeController.getDyanmicTables);
router.get("/table/:id", collegeController.getDynamicTableById);
router.post("/table/delete", collegeController.deleteDynamicTable);
router.put("/table/:collegeId/:tableId", collegeController.updateDynamicTable);
router.post("/table/college", collegeController.getTableByCollegeId);

module.exports = router;
