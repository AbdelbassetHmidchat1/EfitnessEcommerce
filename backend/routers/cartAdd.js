const express = require("express");
const Cart = require("../models/Cart");
const { create } = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

router.post("/add-cart", async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    let cart = await Cart.findOne({ owner: userId });

    if (cart) {
      const product = await Product.findById(itemId);
      let itemExists = false;
      cart.items.map((item) => {
        if (item.itemId.equals(product._id)) {
          itemExists = true;
        }
      });

      if (itemExists) {
        return res.status(400).json({ message: "Item already in cart" });
      } else {
        cart.items.push({ itemId });
        const updatedCart = await cart.save();
        return res
          .status(200)
          .json({ message: "Item added to cart", cart: updatedCart });
      }
    } else {
      const newCart = await Cart.create({ owner: userId, items: [{ itemId }] });
      return res
        .status(201)
        .json({ message: "New cart created and item added", cart: newCart });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

module.exports = router;
