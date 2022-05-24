const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PolicyInfo = new Schema(
  {
    policy_number: {
      required: true,
      unique: true,
      type: String,
      trim: true,
    },
    premium_amount: Number,
    policy_type: String,
    policy_startdate: String,
    policy_enddate: String,
    policy_categry: {
      type: Schema.Types.ObjectId,
      ref: "policy_category",
    },
    policy_company: {
      type: Schema.Types.ObjectId,
      ref: "policy_carrier",
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    username: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("policy_info", PolicyInfo, "policy_info");
