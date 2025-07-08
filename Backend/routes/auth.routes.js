const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersFile = path.join(__dirname, "..", "data", "users.json");

// Register
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body;
  let users = [];

  try {
    users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  }
   catch {}

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {  userId: `user-${Date.now()}`,name, email, password, role };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: "Registered successfully" });
});

router.get("/all-users", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  res.json(users);
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = user;
  res.json({ message: "Login successful", user: { name: user.name, role: user.role } });
});

// Get current user
router.get("/current-user", (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });
  res.json({ user: req.session.user });
});

// UPDATE user
router.put("/user/:email", (req, res) => {
  const email = req.params.email;
  const { name, role } = req.body;
  let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const index = users.findIndex(u => u.email === email);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index].name = name;
  users[index].role = role;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: "User updated successfully" });
});

// DELETE user
router.delete("/user/:email", (req, res) => {
  const email = req.params.email;
  let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const filtered = users.filter(u => u.email !== email);

  if (filtered.length === users.length) {
    return res.status(404).json({ error: "User not found" });
  }

  fs.writeFileSync(usersFile, JSON.stringify(filtered, null, 2));
  res.json({ message: "User deleted successfully" });
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

module.exports = router;
