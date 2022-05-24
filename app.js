const express = require("express");
const config = require("./config");
const { server } = config;
const { port, environment } = server;
const database = require("./utils/database/connectMongoParent");
database(); // Connecting database
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/index")); //api routes
app.listen(port, console.log(`${environment} server started on port ${port}`));
console.log(environment);
