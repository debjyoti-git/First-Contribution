const mongoose = require("mongoose");

exports.drop = async (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/insuredMind", function () {
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
    res.status(200).json("Database dropped");
  });
};
