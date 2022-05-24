const env = process.env.NODE_ENV || "LOCAL";

const LOCAL = {
  server: {
    environment: "LOCAL",
    port: 5000,
  },
  db: {
    uri: process.env.DB_URI || "mongodb://127.0.0.1:27017/insuredMind",
  },
};

const DEVELOPMENT = {
  server: {
    environment: "DEVELOPMENT",
    port: 5000,
  },
  db: {
    uri: process.env.DB_URI,
  },
};
const PRODUCTION = {
  server: {
    environment: "PRODUCTION",
    port: 5000,
  },
  db: {
    uri: process.env.DB_URI,
  },
};

const config = {
  LOCAL,
  DEVELOPMENT,
  PRODUCTION,
};

module.exports = config[env];
