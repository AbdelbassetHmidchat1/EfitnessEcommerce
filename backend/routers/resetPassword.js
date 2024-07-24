const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const router = express.Router();

router.put("/reset-password", async (req, res) => {
  const { password, passwordResetCode } = req.body;
  console.log(passwordResetCode);
  const user = await User.findOne({ passwordResetCode: passwordResetCode });
  console.log(user);
  user.password = password;
  await user.save();

  if (user) {
    const payload = {
      _id:user._id,
      username: user.username,
      isVerified: user.isVerified,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ token });
  } else {
    res.json({ message: "invalid uuid" });
  }
});

module.exports = router;
