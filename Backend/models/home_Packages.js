const mongoose = require("mongoose");
const homePackagesSchema = new mongoose.Schema({
  image: String,
  title: String,
  duration: String,
  link: String, 
  days: Number,
  month: String,
  budget: Number,
},{collection:"homePackages"});
const homePackages = mongoose.model(
  "homePackages",
  homePackagesSchema,
);
module.exports = homePackages;
