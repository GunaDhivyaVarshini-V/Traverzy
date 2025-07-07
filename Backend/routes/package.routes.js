const express = require("express");
const router = express.Router();
const controller = require("../controllers/package.controller");

router.get("/", controller.getPackages); // For /api/packageImages
module.exports = router;
