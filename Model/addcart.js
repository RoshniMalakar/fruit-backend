const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: String,
  rating: String,
  desc: String,
  review: String,
  image: String,
  category: String,
  qty: Number,
});
const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
