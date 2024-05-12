const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    category: { type: String },
    cat: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories_schema", newSchema);
