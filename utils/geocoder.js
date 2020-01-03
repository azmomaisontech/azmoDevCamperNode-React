const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "m9kXO40NEvcIQA9oZYAFMyeeGXluGi3x",
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
