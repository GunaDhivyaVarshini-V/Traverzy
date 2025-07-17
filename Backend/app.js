const express = require("express");
const mongoose = require("mongoose");
// const userModel =require("./models/user")
// const homePackagesModel=require("./models/home_Packages")
// const trendingPackagesModel=require('./models/trending_packages')
const path = require("path");
const app = express();
// const session = require("express-session");
const cookieParser = require("cookie-parser");

app.set('view engine','jade')//setting jade as view engine
app.set('views',path.join(__dirname,'views'))//jade path setting
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb://localhost:27017/Traverzy')
.then(()=>{
  console.log("Mongodb connected")
})
.catch(err=>{
  console.error("mongodb connection failed",err.message)
})


// userModel.find({})
// .then((users)=>{console.log(users)})
// .catch(err=>{
//   console.error("cannot fetch user",err.message)
// })
// homePackagesModel.find({})
// .then((g)=>{console.log(g)})
// .catch(err=>{
//   console.error("cannot fetch user",err.message)
// })
// trendingPackagesModel.find({})
// .then((p)=>{console.log(p)})
// .catch(err=>{
//   console.error("cannot fetch user",err.message)
// })
// app.use(session({
//   secret: "secret",
//   resave: false,
//   saveUninitialized: false, 
//   cookie: {
//     httpOnly: true,
//     maxAge:1000*60*60,
//     secure: false,

//   },
// }));
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/',(req,res)=>{
  res.render("home.jade",{
    "title":"Traverzy-Your Ultimate Travel Partner"
  })
})
app.get('/home',(req,res)=>{
  res.render("home.jade",{
    "title":"Traverzy-Your Ultimate Travel Partner"
  })
})
app.get('/packages', (req, res) => {
  res.render('packages.jade',{
    "title":"Packages"
  }); 
});
app.get('/bookingPage',(req,res)=>{
  res.render("bookingPage")
})
app.get('/add-package', (req, res) => {
  res.render('travelAgent');
});
//routes

const navRoutes = require("./routes/nav.routes");
const packageRoutes = require("./routes/package.routes");
const trendingRoutes = require("./routes/trending.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

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

