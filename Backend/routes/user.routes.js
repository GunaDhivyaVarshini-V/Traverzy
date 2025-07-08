const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// to check admin
router.use((req, res, next) => {
  const user = req.session.user;
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
});

router.get("/all", userController.getAllUsers);

module.exports = router;
