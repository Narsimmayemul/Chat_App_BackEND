const { User_module } = require("../models/user.model");
const bcrypt = require('bcrypt');
const {generateTokenAndSetCookie} = require("../utils/generateToken")


const loginUser = async(req , res)=> {
   try {
    const {username , password} = req.body;
    const user = await User_module.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password , user?.password || "" )
    
    if(!user || !isPasswordCorrect){
        return res.status(400).json({error : 'Invalid Username 0r Password'})
    }

    generateTokenAndSetCookie(user._id , res)
    
    res.status(201).send({
        _id : user._id,
        fullName : user.fullName,
        username : user.username,
        Gender : user.gender,
        profilePic : user.profilePic
    })

} 
   catch (error) {
    console.log("error login Controller "  , error.message);
    res.status(500).send({error : "Internal Server Error"})       
   }
}

const logOutUser = (req , res)=> {
    try {
    res.cookie("jwt" , "" , {maxAge: 0});
    res.status(200).send({error : "Logged out Successfully"});
    } catch (error) {
        console.log("error login Controller "  , error.message);
        res.status(500).send({error : "Internal Server Error"})              
    }
}

const SignUpUser = async(req , res)=> {
    try {
   const {fullName , username ,password ,gender ,conformedPassword} = req.body;  
   if(password !== conformedPassword){
    return res.status(400).send({error:"password don't match"})
   }
   const user = await User_module.findOne({username});
   if(user){
    return res.status(400).send({error:"Username alredy exists"})
   }
   // Hashing password

   const salt = await bcrypt.genSalt(10);
   const hashedPassword =await bcrypt.hash(password , salt);
console.log(hashedPassword)

//    https://avatar-placeholder.iran.liara.run/

const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
const GirlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

   const newUser = User_module({
    fullName ,
    username ,
    password: hashedPassword ,
    gender ,profilePic : gender === "male" ? boyProfilePic : GirlProfilePic
   })
if(newUser){
    generateTokenAndSetCookie(newUser._id , res)
    await newUser.save();
    res.status(201).send({
        _id : newUser._id,
        fullName : newUser.fullName,
        username : username,
        profilePic : newUser.profilePic,
        password : hashedPassword
    })
}else{
    res.status(400).send({error:"Invalid User Data"});
}
    } catch (error) {
    console.log("error signUp Controller "  , error.message);
    res.status(500).send({error : "Internal Server Error"})       
    }
}




module.exports = {loginUser , SignUpUser , logOutUser}