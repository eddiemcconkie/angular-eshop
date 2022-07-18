const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: "CartItem" }],
});

module.exports = model("User", UserSchema);
