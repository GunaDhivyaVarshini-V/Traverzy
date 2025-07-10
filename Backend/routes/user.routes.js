const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// checking admin
// router.use((req, res, next) => {
//   const user = req.session.user;
//   if (!user || user.role !== "admin") {
//     return res.status(403).json({ error: "Unauthorized" });
//   }
//   next();
// });

// Admin routes
router.get("/all-users", userController.getAllUsers);
router.get("/user/:email", userController.getUserByEmail);
router.put("/user/:email", userController.updateUser);
router.delete("/user/:email", userController.deleteUser);
router.get("/dashboard", userController.renderDashboard);
module.exports = router;
