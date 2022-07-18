const { Schema, model } = require("mongoose");

const ShopItemSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imagePath: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = model("ShopItem", ShopItemSchema);
