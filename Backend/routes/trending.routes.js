const express = require("express");
const router = express.Router();
const controller = require("../controllers/package.controller");

router.get("/", controller.getTrendingImages); // For /api/trendingImages
module.exports = router;
