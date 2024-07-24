const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config("../.env");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  

  if (user) {
    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const payload = {
        _id: user._id,
        username: user.username,
        isVerified: user.isVerified,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
