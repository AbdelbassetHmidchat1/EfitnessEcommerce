const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      isVerified: user.isVerified,
    };
    await sendEmail({
      from: "suoad398@gmail.com",
      to: user.email,
      subject: "verify your account",
      text: `to verify your email go to the following page: http://localhost:3000/verify-email/${user.uuid}`,
    });
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ token });
  } catch (error) {
    res.json({ message: "duplicated email" });
  }
});

module.exports = router;
