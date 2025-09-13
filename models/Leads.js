const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, enum: ["Corporate", "Individual"], required: true },
  name: { type: String, required: true, trim: true },
  branch: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true }, // ✅ store as string
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  status: { type: String, required: true },
  source: {
    type: String,
    enum: ["Direct", "Website", "Referral", "Other"],
    default: "Direct",
  },
  country: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model("Lead", leadSchema);
