const router = require("express").Router();
const ShopItem = require("../models/shop-item");

router.get("/", async (req, res) => {
  try {
    const items = await ShopItem.find();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Could not get shop items" });
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const item = await ShopItem.findById(req.params.itemId);
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Could not get shop item" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = await ShopItem.create({
      name: req.body.name,
      description: req.body.description,
      imagePath: req.body.imagePath,
      rating: req.body.rating,
    });
    res.status(201).json({ item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Could not create shop item" });
  }
});

module.exports = router;
