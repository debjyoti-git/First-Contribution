const mongoose = require("mongoose");
const connectDB = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/insuredMind", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected from parent`);
  } catch (error) {
    console.log("Mongo Error: ", error);
    console.error(error);
  }
};

module.exports = connectDB;
