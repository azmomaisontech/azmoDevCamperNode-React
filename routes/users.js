const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const User = require("../models/User");
const advancedQuery = require("../middleware/advancedQuery");

const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/users");

router
  .route("/")
  .get(protect, authorize("admin"), advancedQuery(User), getUsers)
  .post(protect, authorize("admin"), createUser);

router
  .route("/:id")
  .get(protect, authorize("admin"), getUser)
  .put(protect, authorize("admin"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
