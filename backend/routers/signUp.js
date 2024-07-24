const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config("../.env");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    console.log(user);
    const payload = {
      _id:user._id,
      username: user.username,
      isVerified: user.isVerified,
      email: user.email,
    };
    try {
      const response = await sendEmail({
        from: "suoad398@gmail.com",
        to: user.email,
        subject: "verify your account",
        text: `to verify your email go to the following page: http://localhost:3000/verify-email/${user.uuid}`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.json({ token });
  } catch (error) {
    res.json({ message: "duplicated email" });
  }
});

module.exports = router;
