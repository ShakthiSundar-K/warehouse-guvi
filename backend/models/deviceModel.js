const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceID: { type: String, required: true, unique: true },
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  type: { type: String, required: true }, // e.g., "cooling", "dehumidifier", "LED"
  status: { type: String, default: "off" }, // "on" or "off"
});

module.exports = mongoose.model("Device", deviceSchema);
