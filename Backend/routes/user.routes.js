const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// checking admin
const authMiddleware = require("../middleware/authMiddleware");
const{isAdmin} =require("../middleware/adminCheckMiddleware")
router.use(authMiddleware); 
router.use(isAdmin);

// Admin routes
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/all-users",authMiddleware, isAdmin, userController.getAllUsers);
router.get("/user/id/:userId", userController.getUserById);
router.get("/user/:email", userController.getUserByEmail);
router.put("/user/:userId", userController.updateUser);
router.delete("/user/:userId", userController.deleteUser);
router.get("/dashboard", userController.renderDashboard);
router.get("/bookingDetails",userController.renderBookingDetails);
router.get("/approvePackages",userController.approvePackages);
module.exports = router;
