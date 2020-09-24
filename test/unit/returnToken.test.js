const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

dotenv.config({ path: "./config/config.env" });

describe("getSignedJwtToken", () => {
  it("Should Check that client gets jwtToken", () => {
    const payload = {
      _id: mongoose.Types.ObjectId()
    };

    const user = new User(payload);
    const token = user.getSignedJwtToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty("_id", payload.id);
  });
});
