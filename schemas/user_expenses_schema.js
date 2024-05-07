const mongoose = require("mongoose");

const newSchema = new mongoose.Schema(
  {
    user_uniqueId: {
      type: Number,
      required: true,
      unique: true,
    },
    userData: [
      {
        month: { type: String },
        month_data: [
          {
            date: { type: Date },
            day_data: [
              {
                date: { type: Date },
                category: { type: String },
                cost: { type: Number },
                title: { type: String },
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("userExpensesSchema", newSchema);

/**
 * each user will have a unique collection in DB
 * in that there will be a array based on months
 * each month will have array
 * in that every day will have an array in the months
 *
 *
 */
