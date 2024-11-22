const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
