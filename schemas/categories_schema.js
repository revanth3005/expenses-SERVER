const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    category: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories_schema", newSchema);
