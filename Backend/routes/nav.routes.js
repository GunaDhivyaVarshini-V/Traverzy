const express = require("express");
const router = express.Router();
const navController = require("../controllers/nav.controller");

router.get("/", navController.getNavItems);
module.exports = router;
