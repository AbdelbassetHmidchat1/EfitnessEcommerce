const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/items", async (req, res) => {
  const items = await Product.find({});
  res.json({ items });
});

module.exports = router;
