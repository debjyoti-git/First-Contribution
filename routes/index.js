const express = require("express");
const router = express.Router();
const content = require("../controller/content");
const dropdb = require("../controller/dropdb");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");
var parse = require("csv-parser");

const getSearchedData = require("../controller/getSearchedData");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

router.post("/file_upload", upload.single("f_file"), content.getData);
router.get("/drop", dropdb.drop);
router.get("/index", (req, res) => {
  var actualPath = path.join(__dirname, "../views/uploadFile.ejs");
  res.render(actualPath);
});
router.get("/search", (req, res) => {
  var actualPath = path.join(__dirname, "../views/search.ejs");
  res.render(actualPath);
});
router.post("/userdata", getSearchedData.userData);

router.get("/t", (req, res) => {
  res.send("I am unblocked now");
});
module.exports = router;
