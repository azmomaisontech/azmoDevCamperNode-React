const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// @Desc Get all User
// @Route GET api/v1/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedQuery);
});

// @Desc Get a User
// @Route GET api/v1/users/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorResponse(`User not found with the ID ${req.params.id}`, 404));
  res.status(200).json({
    success: true,
    data: user
  });
});

// @Desc Create  User
// @Route POST api/v1/users
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

// @Desc Update User
// @Route PUT api/v1/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) return next(new ErrorResponse(`User not found with the ID ${req.params.id}`, 404));

  res.status(200).json({
    success: true,
    data: user
  });
});

// @Desc Delete User
// @Route DELETE api/v1/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new ErrorResponse(`User not found with the ID ${req.params.id}`, 404));
  res.status(200).json({
    success: true
  });
});
