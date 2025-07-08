const fs = require("fs");
const path = require("path");

// GET all users
exports.getAllUsers = (req, res) => {
  const usersFile = path.join(__dirname, "..", "data", "users.json");
  fs.readFile(usersFile, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to load users" });

    const users = JSON.parse(data);
    res.status(200).json(users);
  });
};
