const express = require("express");
const multer = require("multer");
const legacyController = require("../controllers/legacyController");

const router = express.Router();
const upload = multer();

router.post("/createCourse", upload.any(), legacyController.createCourse);
router.get("/allCourseByUniId/:id", legacyController.getAllCourseByUniversityId);
router.get("/courseById/:id", legacyController.getCourseById);
router.patch("/updateCourse/:id", upload.any(), legacyController.updateCourse);
router.delete("/deleteUnivesity/:id", legacyController.deleteUnivesity);

router.get("/blogById/:id", legacyController.blogById);
router.patch("/updateBlog/:id", upload.any(), legacyController.updateBlog);

router.get("/uniById/:id", legacyController.uniById);
router.patch(
	"/updateUniversity/:id",
	upload.any(),
	legacyController.updateUniversity
);

module.exports = router;
