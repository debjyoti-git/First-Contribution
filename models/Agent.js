const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Agent = new Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("agent", Agent);
