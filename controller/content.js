const { error } = require("console");
const path = require("path");
const fs = require("fs");
const parse = require("csv-parser");
let ejs = require("ejs");

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const workerPath = path.resolve("workers/worker.js");
const dbWorkerPath = path.resolve("workers/dbworker.js");

exports.getData = async (req, res) => {
  const read_data = new Promise((resolve, reject) => {
    const worker = new Worker(workerPath);
    worker.postMessage(req.file.path);
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error("Worker stopped with exit code"));
    });
  });
  function save_data(data) {
    return new Promise((resolve, reject) => {
      const save_worker = new Worker(dbWorkerPath);
      save_worker.postMessage(data);
      save_worker.on("message", resolve);
      save_worker.on("error", reject);
      save_worker.on("exit", (code) => {
        if (code !== 0) reject(new Error("Worker stopped with exit code"));
      });
    });
  }
  read_data
    .then((response) => {
      return save_data(response);
    })
    .then(({ result, message }) => {
      var status;
      result ? (status = 200) : (status = 500);
      var actualPath = path.join(__dirname, "../views/search.ejs");
      res.status(status).json(message);
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  // for (let i = 0; i < 100000; i++) {
  //   console.log(i);
  // }
  console.log("Main thread is running not waiting");
};
