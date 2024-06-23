const Cart = require("../models/Cart");
const express = require("express");
const router = express.Router();

router.put("/delete-item", async (req, res) => {
  const { itemId, userId } = req.body;

  try {
    const cart = await Cart.findOne({ owner: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.itemId.toString() !== itemId);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
