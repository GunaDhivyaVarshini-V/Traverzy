exports.isAdmin=(req, res, next) => {
  
  if (!req.user) {
    console.log("User not authenticated");
    return res.status(403).json({ error: "Unauthorized" });
  }
  if (req.user.role !== "admin") {
    console.log("User is not admin:", req.user.role);
    return res.status(403).json({ error: "Unauthorized" });
  }
  console.log(" Authenticated as admin:", req.user.email);
  next();
};