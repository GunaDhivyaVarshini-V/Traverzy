const express = require("express");
const router = express.Router();
const controller = require("../controllers/package.controller");
const bookingController =require("../controllers/booking.controller")
router.get("/", controller.getTrendingImages); // For /api/trendingImages
router.post('/bookingPage/:packageId', bookingController.submitBooking);
module.exports = router;
