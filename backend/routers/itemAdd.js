const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/add-item", async (req, res) => {
  const { name, description, category, price } = req.body;

  const newPost = await Product.create({
    name: name,
    description: description,
    category: category,
    price: price,
  });
  res.json({ newPost });
});

module.exports = router;
