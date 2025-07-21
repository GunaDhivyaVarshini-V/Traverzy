const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  departureAirport: String,
  arrivalAirport: String,
  departureTime: Date,
  arrivalTime: Date,
  price: Number
}, { _id: false });

const hotelSchema = new mongoose.Schema({
  hotelName: String,
  location: String,
  checkInDate: Date,
  checkOutDate: Date,
  roomType: String,
  pricePerNight: Number,
  rating: Number
}, { _id: false });

const activitySchema = new mongoose.Schema({
  activityName: String,
  description: String,
  location: String,
  activityDate: Date,
  price: Number
}, { _id: false });

const transportationSchema = new mongoose.Schema({
  type: String,
  pickUpLocation: String,
  dropOffLocation: String,
  pickUpDateTime: Date,
  dropOffDateTime: Date,
  price: Number
}, { _id: false });

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  destination: String,
  images:[String],
  price: { type: Number, required: true },
  discount: Number,
  availableSeats: Number,
  startDate: Date,
  endDate: Date,
  days: Number,
  nights: Number,
  season: String,
  agentName: String,
  status: { type: String, default: "pending" },
  packageType: String,
  flights: [flightSchema],
  hotels: [hotelSchema],
  activities: [activitySchema],
  transportation: [transportationSchema],
  foodPreferences: [String] // e.g. ["Veg", "Non-Veg", "Jain"]
}, { collection: "packages" });

module.exports = mongoose.model("Package", packageSchema);
