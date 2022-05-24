const mongoose = require("mongoose");
const config = require("../../config");
const { db } = config;

// const connectDB = async () => {
//   let connectionUrl = "mongodb://127.0.0.1:27017/insuredMind";
//   let connectionOptions = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   };

//   mongoose.connect(connectionUrl, connectionOptions).then(async function () {
//     // create connection object
//     let db = mongoose.connection.db;

//     // get list of available collections
//     let collections = await db.listCollections().toArray();

//     collections.forEach(async function (collection) {
//       // get collection name and available documents count.
//       console.log(
//         collection.name,
//         await db.collection(collection.name).countDocuments()
//       );
//     });
//   });
// };

const connectDB = new Promise((resolve, reject) => {
  let connectionUrl = "mongodb://127.0.0.1:27017/insuredMind";
  let connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  mongoose.connect(connectionUrl, connectionOptions).then(async function () {
    let db = mongoose.connection.db;
    console.log("Mongo Connected from worker thread");
    resolve(true);
  });
});

module.exports = connectDB;
