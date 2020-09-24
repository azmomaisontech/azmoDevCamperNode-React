const express = require("express");
const router = express.Router({ mergeParams: true });
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const advancedQuery = require("../middleware/advancedQuery");
const { protect } = require("../middleware/auth");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

const { getCourses, getCourse, addCourse, updateCourse, deleteCourse } = require("../controllers/courses");

router
  .route("/")
  .get(advancedQuery(Course, { path: "bootcamp", select: "name description" }), getCourses)
  .post(protect, addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
