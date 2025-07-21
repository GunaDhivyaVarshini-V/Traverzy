const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const packageModel = require("../models/packages");
const secret = "jwt_token";

/**
 * Renders the admin dashboard with a list of users
 */
exports.renderDashboard = async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("admin", {
      users,
      currentUser: req.session.user || null,
    });
  } catch (error) {
    res.status(500).json({ message: "Error rendering dashboard", error });
  }
};

/**
 * Renders the package approval page
 */
exports.approvePackages = async (req, res) => {
  try {
    const packages = await packageModel.find();
    res.render("approvePackages", { packages });
  } catch (error) {
    console.error("Error loading approvePackages:", error);
    res.status(500).json({ message: "Error rendering approvePackages page", error });
  }
};

/**
 * Renders the booking details page
 */
exports.renderBookingDetails = async (req, res) => {
  try {
    res.render("bookingDetails");
  } catch (error) {
    res.status(500).json({ message: "Error rendering booked packages", error });
  }
};

/**
 * Registers a new user after checking email availability
 */
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
      role,
    });

    await newUser.save();
    res.json({ message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

/**
 * Logs in a user and sets session and token cookies
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = {
      userId: user.userId || user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
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
      user: { name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

/**
 * Logs out the user by destroying session and removing cookie
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Error logging out");
    }

    res.clearCookie("token");
    res.redirect("/home");
  });
};

/**
 * Returns the currently logged-in session user
 */
exports.getCurrentUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }
  res.json({ user: req.session.user });
};

/**
 * Returns all users based on name, email, and role filters with sorting
 */
exports.getAllUsers = async (req, res) => {
  try {
    const {
      name = "",
      email = "",
      role = "",
      sortBy = "name",
      order = "asc",
    } = req.query;

    const query = {
      name: { $regex: name, $options: "i" },
      email: { $regex: email, $options: "i" },
      role: { $regex: role, $options: "i" },
    };

    const users = await userModel
      .find(query)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 });

    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Returns a user by email
 */
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

/**
 * Returns a user by custom userId
 */
exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

/**
 * Updates a user's name and role using userId
 */
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

/**
 * Deletes a user using userId; logs out if current user deletes self
 */
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await userModel.findOneAndDelete({ userId });

    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    if (req.session.user && req.session.user.userId === userId) {
      res.clearCookie("token");
      return res.status(200).json({ message: "You were deleted. Logged out." });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
