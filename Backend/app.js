const express = require("express");
const path = require("path");
const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/",(req,res,next)=>{
//     next();
//     // res.data({
//     //     sucess:true,
//     //     message:"hello world"})
// })
// app.post('/submit',(req,res)=>{
//     console.log(req.body);
//     res.json({
//         message:"hiiiiiiiiii"
//     });

// })
app.use(express.static(path.join(__dirname, "public")));

//routes

const navRoutes = require("./routes/nav.routes");
const packageRoutes = require("./routes/package.routes");
const trendingRoutes = require("./routes/trending.routes");

app.use("/api/nav", navRoutes);
app.use("/api/packageImages", packageRoutes);
app.use("/api/trendingImages", trendingRoutes);

//catch-all routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.listen(3000, () => {
  console.log("Server is running");
});
