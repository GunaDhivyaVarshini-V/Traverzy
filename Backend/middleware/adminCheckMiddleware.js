/**
 * Middleware to restrict access to admin users only.
 * - Checks if the user is logged in (req.session.user exists)
 * - Checks if the user's role is "admin"
 * - If both checks pass → proceeds to next middleware
 * - Otherwise → responds with 403 Unauthorized
 */
exports.isAdmin = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    console.log("User not authenticated");
    return res.status(403).json({ error: "Unauthorized: Login required" });
  }

  if (user.role !== "admin") {
    console.log("User is not admin:", user.role);
    return res.status(403).json({ error: "Unauthorized: Admins only" });
  }

  console.log("Authenticated as admin:", user.email);
  next();
};
