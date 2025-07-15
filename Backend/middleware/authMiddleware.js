const jwt = require("jsonwebtoken");
const secret = "jwt_token";

module.exports = (req, res, next) => {
  let token = null;

  //Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // Fallback to cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
    console.log("Token extracted from cookies");
  }

  if (!token) {
    console.log("Token missing from headers and cookies");
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log("Authenticated user:", decoded);
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};
