const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true }, // we will calculate before saving
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Cancelled"],
      default: "Draft",
    },
    phone: { type: String },
    state: { type: String },
    city: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
