const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/verify-email", async (req, res) => {
  const { uuid } = req.body;
  const user = await User.findOne({ uuid: uuid });

  if (user) {
    user.isVerified = true;
    await user.save();
    const payload = {
      _id: user._id,
      username: user.username,
      isVerified: true,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ token });
  } else res.json({ message: "verification link invalid" });
});

module.exports = router;


