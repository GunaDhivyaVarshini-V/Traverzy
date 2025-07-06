const express=require("express");
const app=express();
app.use(express.json());
app.use("/",(req,res,next)=>{
    next();
    // res.data({
    //     sucess:true,
    //     message:"hello world"})
})
app.post('/submit',(req,res)=>{
    console.log(req.body);
    res.json({
        message:"hiiiiiiiiii"
    });

})
    

app.listen(3000,()=>{
    console.log("Server is running");
})