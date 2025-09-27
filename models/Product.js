const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productNo: { type: String, required: true, unique: true },
  imageUrl: { type: String }, // store image file path or URL
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
