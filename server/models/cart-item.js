const { Schema, model } = require("mongoose");

const CartItemSchema = Schema({
  shopItem: { type: Schema.Types.ObjectId, ref: "ShopItem", required: true },
  quantity: { type: Number, required: true },
});

module.exports = model("CartItem", CartItemSchema);
