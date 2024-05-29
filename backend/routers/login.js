const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    
    if (compare) {

      const payload = {
        username: user.username,
        email: user.email,
        password: user.password,
        isVerified: user.isVerified,
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      console.log("login success");
      res.json({ token });
    } else {
      res.json({ error: "wrong password" });
    }
  } else {
    res.json({ error: "user not found" });
  }
});

module.exports = router;
