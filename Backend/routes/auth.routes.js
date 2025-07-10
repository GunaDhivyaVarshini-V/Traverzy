const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Register
router.post("/register", userController.register);

// Login
router.post("/login", userController.login);

// Current User
router.get("/current-user", userController.getCurrentUser);

// Logout
router.get("/logout", userController.logout);

module.exports = router;
