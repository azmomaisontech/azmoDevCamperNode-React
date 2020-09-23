const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
  registerUser,
  loginUser,
  getAUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  updateUserDetails,
  updatePassword
} = require("../controllers/auths");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getAUser);
router.get("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updatedetails", protect, updateUserDetails);
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
