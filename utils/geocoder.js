const NodeGeocoder = require("node-geocoder");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
