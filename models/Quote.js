const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  description: { type: String },
  qty: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
});

const quoteSchema = new mongoose.Schema(
  {
    client: { type: String, required: true },
    number: { type: String, required: true },
    year: { type: String, required: true },
    status: {
      type: String,
      enum: ["Draft", "Pending", "Sent", "Accepted", "Decline"],
      default: "Draft",
    },
    date: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    note: { type: String },
    items: [itemSchema],
    subTotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", quoteSchema);
