const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    user_id: { type: Number },
    category: { type: String },
    title: { type: String },
    date: { type: Date },
    amount: { type: parseFloat(Number) },
    month: { type: String },
    year: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_items_schema", newSchema);
