exports.isAdmin=(req, res, next) => {
  
  if (!req.session || !req.session.user) {
    console.log("No session or user found");
    return res.status(403).json({ error: "Unauthorized" });
  }
  if (req.session.user.role !== "admin") {
    console.log("User is not admin:", req.session.user.role);
    return res.status(403).json({ error: "Unauthorized" });
  }
  console.log(" Authenticated as admin:", req.session.user.email);
  next();
};