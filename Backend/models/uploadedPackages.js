const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  image: String,
  title: String,
  destination: String,
  price: Number,
  duration: String,
  agentName: String,
  status: { type: String, default: "pending" },
  packageImage: { type: String } // Store the path to the uploaded image
});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
