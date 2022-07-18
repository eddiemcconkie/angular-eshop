const router = require("express").Router();
const CartItem = require("../models/cart-item");
const User = require("../models/user");

router.put("/:cartItemId", async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(
      req.params.cartItemId,
      { $set: { quantity: req.body.quantity } },
      { new: true }
    ).populate("shopItem");
    res.status(200).json({ cartItem });
  } catch (error) {
    res.status(500).json({ message: "Could not update cart item" });
  }
});

router.delete("/:cartItemId", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.cartItemId);
    await User.findOneAndUpdate(
      { cartMatch: { $elemMatch: { $eq: req.params.cartItemId } } },
      { $pull: { cart: req.params.cartItemId } }
    );
    res.status(204).json({ message: "Cart item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete cart item" });
  }
});

module.exports = router;
