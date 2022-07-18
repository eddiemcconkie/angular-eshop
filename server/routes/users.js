const router = require("express").Router();
const User = require("../models/user");
const CartItem = require("../models/cart-item");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Could not get users" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Could not get user" });
  }
});

router.get("/:userId/cart", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("cart")
      .populate({ path: "cart", populate: { path: "shopItem" } });
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Could not get cart" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      cart: [],
    });
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Could not create user" });
  }
});

router.post("/:userId/cart", async (req, res) => {
  try {
    const newCartItem = await CartItem.create({
      shopItem: req.body.shopItemId,
      quantity: req.body.quantity,
    });
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { cart: newCartItem._id },
    });
    await newCartItem.populate("shopItem");
    // console.log("POST", newCartItem);
    res.status(201).json({ cartItem: newCartItem });
  } catch (error) {
    res.status(500).json({ message: "Could not add item to cart" });
  }
});

module.exports = router;
