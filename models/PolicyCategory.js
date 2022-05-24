const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PolicyCategory = new Schema(
  {
    category_name: {
      required: true,

      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "policy_category",
  PolicyCategory,
  "policy_category"
);
