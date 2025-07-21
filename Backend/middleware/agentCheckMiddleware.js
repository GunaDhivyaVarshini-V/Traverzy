exports.isAgent=(req, res, next) => {
  
  if (!req.session.user) {
    console.log("User not authenticated");
    return res.status(403).json({ error: "Unauthorized" });
  }
  if (req.session.user.role !== "agent") {
    console.log("User is not admin:", req.session.user.role);
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
};