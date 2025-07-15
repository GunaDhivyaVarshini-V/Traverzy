const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const secret = "jwt_token";

//Dashboard
exports.renderDashboard = async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("admin", {
      users,
      currentUser: req.user || null
    });
  } catch (error) {
    res.status(500).json({ message: "Error rendering dashboard", error });
  }
};

//register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new userModel({
      userId: `user-${Date.now()}`,
      name,
      email,
      password,
      role
    });

    await newUser.save();
    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        role: user.role,
        name: user.name
      },
      secret,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.json({
      message: "Login successful",
      user: { name: user.name, role: user.role },token
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

// Get Current User
exports.getCurrentUser = (req, res) => {
  if (!req.user)
    return res.status(401).json({ error: "Not logged in" });
  res.json({ user: req.user });
};
// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
// Get User by Email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
// Update User
exports.updateUser = async (req, res) => {
  const { name, role } = req.body;

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { userId: req.params.userId },
      { name, role },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
// Delete User
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await userModel.findOneAndDelete({ userId });

    if (!deletedUser)
      return res.status(404).json({ error: "User not found" });

    // If the current user is deleting themselves
    if (req.user && req.user.userId === userId) {
      res.clearCookie("token");
      return res.status(200).json({ message: "You were deleted. Logged out." });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
