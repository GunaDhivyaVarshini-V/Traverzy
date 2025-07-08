const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const userRoutes = require("./routes/user.routes");
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: true
}));

//routes

const navRoutes = require("./routes/nav.routes");
const packageRoutes = require("./routes/package.routes");
const trendingRoutes = require("./routes/trending.routes");
const authRoutes = require("./routes/auth.routes");
const apiVersion="/api/v1"

app.use(apiVersion + "/auth", authRoutes);
app.use(apiVersion+"/nav", navRoutes);
app.use(apiVersion+"/packageImages", packageRoutes);
app.use(apiVersion+"/trendingImages", trendingRoutes);
app.use(apiVersion+"/users", userRoutes);
//catch-all routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(3000, () => {
  console.log("Server is running");
});

