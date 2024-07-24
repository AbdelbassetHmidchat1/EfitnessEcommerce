const express = require("express");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
require("dotenv").config("../.env");

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log(process.env.SENDGRID_API_KEY);

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      try {
        const response = await sendEmail({
          from: "suoad398@gmail.com",
          to: user.email,
          subject: "Forgot your password",
          text: `to change your password click here http://localhost:3000/reset-password/${user.passwordResetCode}`,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      res.send("done");
    } else {
      res.json({ message: "email not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
