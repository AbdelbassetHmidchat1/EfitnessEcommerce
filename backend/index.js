const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config("./.env");

mongoose.connect(process.env.MONGODB_URL);

const cors = require("cors");
const app = express();
const login = require("./routers/login");
const signUp = require("./routers/signUp");
const forgotPassword = require("./routers/forgotPassword");
const resetPassword = require("./routers/resetPassword");
const verifyEmail = require("./routers/verifyEmail");
const itemAdd = require("./routers/itemAdd");
const cartAdd = require("./routers/cartAdd");
const fetchItems = require("./routers/fetchItems");
const fetchCart = require("./routers/fetchCart");
const deleteItem = require("./routers/deleteItem");

app.use(express.json());
app.use(cors());
app.use("/api", login);
app.use("/api", signUp);
app.use("/api", verifyEmail);
app.use("/api", forgotPassword);
app.use("/api", resetPassword);
app.use("/api", itemAdd);
app.use("/api", cartAdd);
app.use("/api", fetchItems);
app.use("/api", fetchCart);
app.use("/api", deleteItem);

app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(4000, () => {
  console.log("at 4000");
});
