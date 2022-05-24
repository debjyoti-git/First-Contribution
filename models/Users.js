const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    gender: String,
    phone: String,
    address: {
      type: String,
      trim: true,
    },
    state: String,
    city: String,
    email: String,
    zip: String,
    dob: String,
    userType: String,
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "agents",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", Users, "users");
