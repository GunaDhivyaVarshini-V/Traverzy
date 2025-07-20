const mongoose = require("mongoose");
const trendingImagesSchema = new mongoose.Schema({
  package_title: String,
  destination: String,
  description:String,
  category:String,
  price: Number,
  discount:{type:String,required:false},
  startDate:{type:Date,required:false},
  endDate:{type:Date,required:false},
  duration: String,
  agentName: String,
  availableSeats:Number,
  status: { type: String, default: "pending" }
},{collection:"trendingPackages"});
const trendingPackages = mongoose.model("trendingPackages", trendingImagesSchema);
module.exports = trendingPackages;
