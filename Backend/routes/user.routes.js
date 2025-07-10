const path = require("path");
const fs = require("fs");
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
router.get("/dashboard", (req, res) => {
  const usersFile = path.join(__dirname, "..", "data", "users.json");

  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).render("error", { message: "Failed to load users" });
    }

    const users = JSON.parse(data);
    res.render("admin", { users }); // render admin.jade with users array
  });
});

router.get("/all", userController.getAllUsers);

module.exports = router;
