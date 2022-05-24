const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PolicyCarrier = new Schema(
  {
    company_name: {
      required: true,
      unique: false,
      type: String,
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "policy_category",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "policy_carrier",
  PolicyCarrier,
  "policy_carrier"
);
