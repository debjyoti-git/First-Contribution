const { Worker, parentPort, workerData } = require("worker_threads");
// const Agent = require("../models/Agent");
// const Users = require("../models/Users");
const path = require("path");
const fs = require("fs");
var parse = require("csv-parser");
var upload = [];

parentPort.on("message", (filePath) => {
  console.log("Inside worker path");
  const reader = fs.createReadStream(filePath);
  try {
    reader.pipe(parse({ delimeter: "," })).on("data", (chunk) => {
      upload.push(chunk);
    });
    reader.on("end", () => {
      parentPort.postMessage(upload);
    });
  } catch (err) {
    parentPort.close();
    console.log(err);
  }
});
