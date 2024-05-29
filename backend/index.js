const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Ecommerce");
const cors = require("cors");
const app = express();
const login = require("./routers/login");
const signUp = require("./routers/signUp");
const verifyEmail = require("./routers/verifyEmail");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api", login);
app.use("/api", signUp);
app.use("/api", verifyEmail);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(4000, () => {
  console.log("at 4000");
});
