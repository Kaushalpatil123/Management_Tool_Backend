const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  description: { type: String },
  qty: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true, default: 0 }
});

const invoiceSchema = new mongoose.Schema(
  {
    client: { type: String, required: true },
    year: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Cancelled"],
      default: "Draft"
    },
    paid: { type: Number, default: 0 },
    date: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    note: { type: String },
    items: [itemSchema],
    subTotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);


