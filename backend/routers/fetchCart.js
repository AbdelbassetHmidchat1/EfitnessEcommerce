const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.post("/cart", async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ owner: userId }).populate("items.itemId");

    if (cart) {
      res.json({ cart: cart.items });
    } else {
      res.json({ cart: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
