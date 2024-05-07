const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    user_id_start: {
      type: Number,
    },
    present_user_id: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userCount", newSchema);
