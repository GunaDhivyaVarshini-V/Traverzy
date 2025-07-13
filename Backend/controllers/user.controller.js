const fs = require("fs");
const path = require("path");
const usersFile = path.join(__dirname, "..", "data", "users.json");

exports.renderDashboard = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  res.render("admin", {
  users,
  currentUser: req.session.user || null
});
};

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  let users = [];

  try {
    users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  } catch {}

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = {
    userId: `user-${Date.now()}`,
    name,
    email,
    password,
    role,
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: "Registered successfully" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  req.session.user = user;
  res.cookie("sesssionId",user.userId,{
    "httpOnly":true,
    "MaxAge":1000*60*60,
    "secure":false
  }) 
  res.json({
    message: "Login successful",
    user: { name: user.name, role: user.role },
  });
};

exports.logout = (req, res) => {
  console.log("Logging out:", req.session.user?.email);
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
};

exports.getCurrentUser = (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ error: "Not logged in" });
  res.json({ user: req.session.user });
};

exports.getAllUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  res.status(200).json(users);
};

exports.getUserByEmail = (req, res) => {
  const email = req.params.email;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;
  const { name, role } = req.body;
  let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const index = users.findIndex((u) => u.userId === userId);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index].name = name;
  users[index].role = role;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  if (req.session.user && req.session.user.userId === userId) {
    req.session.user.name = name;
    req.session.user.role = role;
    req.session.save();
  }
  res.json({ message: "User updated successfully" });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  let users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const filtered = users.filter((u) => u.userId !== userId);

  if (filtered.length === users.length) {
    return res.status(404).json({ error: "User not found" });
  }

  fs.writeFileSync(usersFile, JSON.stringify(filtered, null, 2));
  if (req.session.user && req.session.user.userId === userId) {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "You were deleted. Logged out." });
    });
  } else {
    res.json({ message: "User deleted successfully" });
  }
};
