const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersAccount = new Schema(
  {
    account_name: {
      required: true,
      type: String,
      trim: true,
    },
    userids: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("users_account", UsersAccount, "users_account");
