const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/async");
const { protect } = require("../middleware/auth");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
// const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @Desc Register a new User
// @Route POST api/v1/auth/register
// @access Public

router.post(
  "/register",
  asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    sendTokenResponse(user, 201, res);
  })
);

// @Desc Login a user
// @Route Post api/v1/auth/login
// @access Public
router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //check if fields are empty
    if (!email || !password)
      return next(new ErrorResponse(`Please enter email and password`, 404));

    //check if email address match
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse(`Invalid credentials`, 401));

    //check if password match
    const isMatch = await user.comparePassword(password);

    if (!isMatch) return next(new ErrorResponse(`Invalid credentials`, 401));

    sendTokenResponse(user, 200, res);
  })
);

// @Desc Get a user
// @Route Get api/v1/auth/me
// @access Private
router.get(
  "/me",
  protect,
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  })
);

// @Desc Logout a user
// @Route GET api/v1/auth/logout
// @Access Private
router.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true
    });
  })
);

// @Desc Forgot Password
// @Route /api/v1/auth/forgotPassword
// @Access Public
router.post(
  "/forgotpassword",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return next(
        new ErrorResponse("User does not exist with this email", 404)
      );

    //Get reset Token
    const resetToken = user.generateResetPasswordToken();

    await user.save({
      validateBeforeSave: false
    });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/forgotpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    // try {
    //   await sendEmail({
    //     message,
    //     subject: "Password Reset Token",
    //     email: user.email
    //   });

    //   res.status(200).json({
    //     success: true,
    //     data: "Email sent"
    //   });
    // } catch (err) {
    //   console.error(err);
    //   user.resetPasswordToken = undefined;
    //   user.resetPasswordExpire = undefined;

    //   await user.save({
    //     validateBeforeSave: false
    //   });
    //   return next(new ErrorResponse(`Email could not be sent`, 500));
    // }

    res.status(200).json({
      success: true,
      data: message
    });
  })
);

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
router.put(
  "/resetpassword/:resettoken",
  asyncHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return next(new ErrorResponse("Invalid token", 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  })
);

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
router.put(
  "/updatedetails",
  protect,
  asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  })
);

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
router.put(
  "/updatepassword",
  protect,
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return next(new ErrorResponse("Password is incorrect", 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  })
);

//Send a cookie to the client
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token
    });
};

module.exports = router;
