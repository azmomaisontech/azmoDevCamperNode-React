const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/async");
const { protect, authorize } = require("../middleware/auth");
const advancedQuery = require("../middleware/advancedQuery");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @Desc Get all User
// @Route GET api/v1/users
// @access Private/Admin
router.get(
  "/",
  protect,
  authorize("admin"),
  advancedQuery(User),
  asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedQuery);
  })
);

// @Desc Get a User
// @Route GET api/v1/users/:id
// @access Private/Admin
router.get(
  "/:id",
  protect,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user)
      return next(
        new ErrorResponse(`User not found with the ID ${req.params.id}`, 404)
      );
    res.status(200).json({
      success: true,
      data: user
    });
  })
);

// @Desc Create  User
// @Route POST api/v1/users
// @access Private/Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  })
);

// @Desc Update User
// @Route PUT api/v1/users/:id
// @access Private/Admin
router.put(
  "/:id",
  protect,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user)
      return next(
        new ErrorResponse(`User not found with the ID ${req.params.id}`, 404)
      );

    res.status(200).json({
      success: true,
      data: user
    });
  })
);

// @Desc Delete User
// @Route DELETE api/v1/users/:id
// @access Private/Admin
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return next(
        new ErrorResponse(`User not found with the ID ${req.params.id}`, 404)
      );
    res.status(200).json({
      success: true
    });
  })
);

module.exports = router;
