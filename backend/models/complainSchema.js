const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    complaint: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complain", complainSchema);
