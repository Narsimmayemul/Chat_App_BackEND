const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{type:String , Required:true},
    username:{type:String , Required:true , unique:true},
    password:{type:String , Required:true},
    gender:{type:String , Required:true, enum:["male" , "female"]},
    profilePic:{
        type:String ,
        default:"",
    },
} , {timestamps : true});

const User_module = mongoose.model("User" , userSchema);

module.exports = {User_module}