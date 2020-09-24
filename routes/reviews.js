const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const { protect, authorize } = require("../middleware/auth");
const advancedQuery = require("../middleware/advancedQuery");

const { getReviews, getReview, postReview, updateReview, deleteReview } = require("../controllers/reviews");

router
  .route("/")
  .get(advancedQuery(Review, { path: "bootcamp", select: "name description" }), getReviews)
  .post(protect, authorize("user", "admin"), postReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

module.exports = router;
