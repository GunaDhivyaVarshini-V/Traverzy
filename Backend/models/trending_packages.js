const mongoose = require("mongoose");
const trendingImagesSchema = new mongoose.Schema({
  image: String,
  title: String,
  destination: String,
  price: Number,
  duration: String,
  link: String,
  agentName: String,
  status: { type: String, default: "pending" }
},{collection:"trendingPackages"});
const trendingPackages = mongoose.model("trendingPackages", trendingImagesSchema);
module.exports = trendingPackages;
