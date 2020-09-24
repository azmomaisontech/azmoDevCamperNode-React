const express = require("express");
const router = express.Router();
const Bootcamp = require("../models/Bootcamp");
const advancedQuery = require("../middleware/advancedQuery");
const { protect, authorize } = require("../middleware/auth");
const courses = require("./courses");
const reviews = require("./reviews");

const {
  getBootcamps,
  getBootcamp,
  addBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsByDistance,
  uploadPhoto
} = require("../controllers/bootamps");

router
  .route("/")
  .get(advancedQuery(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), addBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

router.get("/radius/:zipcode/:distance", getBootcampsByDistance);
router.put("/:id/photo", protect, authorize("publisher", "admin"), uploadPhoto);

// @Desc to get courses for a bootcamp
// route /api/v1/bootcamps/:bootcampId/courses
// access Public
router.use("/:bootcampId/courses", courses);

// @Desc to get reviews for a bootcamp
// route /api/v1/bootcamps/:bootcampId/reviews
// access Public
router.use("/:bootcampId/reviews", reviews);

module.exports = router;
