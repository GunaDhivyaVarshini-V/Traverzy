const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// checking admin

const{isAdmin} =require("../middleware/adminCheckMiddleware")
router.use(isAdmin);

// Admin routes
router.get("/all-users", userController.getAllUsers);
router.get("/user/:email", userController.getUserByEmail);
router.put("/user/:userId", userController.updateUser);
router.delete("/user/:userId", userController.deleteUser);
router.get("/dashboard", userController.renderDashboard);
module.exports = router;
