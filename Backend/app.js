const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const packagesModel = require("./models/packages");
const path = require("path");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.set("view engine", "jade"); //setting jade as view engine
app.set("views", path.join(__dirname, "views")); //jade path setting
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/Traverzy")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.error("mongodb connection failed", err.message);
  });
app.use(
  session({
    secret: "tasknest",
    resave: false,
    saveUninitialized: true,
  }),
);
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.render("home.jade", {
    title: "Traverzy-Your Ultimate Travel Partner",
  });
});
app.get("/home", (req, res) => {
  res.render("home.jade", {
    title: "Traverzy-Your Ultimate Travel Partner",
  });
});
app.get("/packages", (req, res) => {
  res.render("packages.jade", {
    title: "Packages",
  });
});
app.use("/bookingPage/:packageId", async (req, res) => {
  const packageId = req.params.packageId;
  try {
    const selectedPackage = await packagesModel.findById(packageId);
    if (!selectedPackage) {
      return res.status(404).send("Package not found");
    }
    res.render("bookingPage", { selectedPackage });
  } catch (error) {
    res.status(500).send("Error loading package details");
  }
});

app.use(async (req, res, next) => {
  if (req.session?.userId && !req.session.user) {
    try {
      const user = await userModel.findById(req.session.userId).lean();
      if (user) {
        req.session.user = user;
      }
    } catch (err) {
      console.error("Error loading session user:", err.message);
    }
  }
  next();
});

//routes

const navRoutes = require("./routes/nav.routes");
const packageRoutes = require("./routes/package.routes");
const trendingRoutes = require("./routes/trending.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const agentRoutes = require("./routes/agent.routes");
const apiVersion = "/api/v1";

app.use(apiVersion + "/auth", authRoutes);
app.use(apiVersion + "/nav", navRoutes);
app.use(apiVersion + "/packageImages", packageRoutes);
app.use(apiVersion + "/trendingImages", trendingRoutes);
// app.use("/bookingPackages",trendingRoutes)
app.use(apiVersion + "/users", userRoutes);
app.use(apiVersion + "/", agentRoutes);

app.use("/uploads", express.static("uploads"));
app.use(apiVersion + "/package", agentRoutes);

//catch-all routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(3000, () => {
  console.log("Server is running");
});
