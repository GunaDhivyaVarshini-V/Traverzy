const mongoose = require("mongoose");
const trendingImagesSchema = new mongoose.Schema({
  image: String,
  title: String,
  duration: String,
  link: String,
},{collection:"trendingPackages"});
const trendingPackages = mongoose.model("trendingPackages", trendingImagesSchema);
module.exports = trendingPackages;
