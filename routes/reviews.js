const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const { protect, authorize } = require("../middleware/auth");
const advancedQuery = require("../middleware/advancedQuery");
const ErrorResponse = require("../utils/errorResponse");

//@desc      Get all Reviews
//@route     GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
//@access    Public
router.get(
  "/",
  advancedQuery(Review, { path: "bootcamp", select: "name description" }),
  asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
      const bootcamp = await Bootcamp.findById(req.params.bootcampId);
      if (!bootcamp)
        return next(
          new ErrorResponse(
            `Bootcamp does not exist with the ID ${req.params.bootcampId}`,
            404
          )
        );

      const reviews = await Review.find({
        bootcamp: req.params.bootcampId
      }).populate("user", "name");

      return res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews
      });
    } else {
      res.status(200).json(res.advancedQuery);
    }
  })
);

//@desc      Get A Review
//@route     GET /api/v1/reviews/:id
//@access    Public
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description"
    });

    if (!review)
      return next(
        new ErrorResponse(`No review with the ID ${req.params.id}`, 404)
      );

    res.status(200).json({
      success: true,
      data: review
    });
  })
);

//@desc      Add a Review
//@route     POST /api/v1/bootcamps/:bootcampid/reviews
//@access    Private/Admin/User
router.post(
  "/",
  protect,
  authorize("user", "admin"),
  asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;
    req.body.user = req.user.id;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);
    if (!bootcamp)
      return next(
        new ErrorResponse(
          `Bootcamp does not exist with the ID ${req.params.bootcampId}`,
          404
        )
      );

    const review = await Review.create(req.body);

    res.status(200).json({
      success: true,
      data: review
    });
  })
);

//@desc      Update a Reviews
//@route     GET /api/v1/reviews/:id
//@access    Public
router.put(
  "/:id",
  protect,
  authorize("user", "admin"),
  asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review)
      return next(
        new ErrorResponse(
          `There is no review with the ID ${req.params.id}`,
          404
        )
      );

    //Make sure review belongs to logged in user
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(`User not authorized to perform this task`, 401)
      );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("bootcamp", "name");

    res.status(200).json({
      success: true,
      data: review
    });
  })
);

router.delete(
  "/:id",
  protect,
  authorize("user", "admin"),
  asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review)
      return next(
        new ErrorResponse(
          `There is no review with the ID ${req.params.id}`,
          404
        )
      );

    //Make sure review belongs to logged in user
    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(`User not authorized to perform this task`, 401)
      );
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true
    });
  })
);

module.exports = router;
