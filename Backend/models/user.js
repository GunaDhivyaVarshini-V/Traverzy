const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    userId: String,
    name:  String,
    email:  String,
    password:  String,
    role:  String
})
const user=mongoose.model('user',userSchema)
module.exports=user;