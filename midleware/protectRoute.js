const jwt = require("jsonwebtoken");
const { User_module } = require("../models/user.model");
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./local-storage');

const protectRoute = async(req , res, next)=>{
    try {
        // const token = req.cookies.jwt;
        const token = JSON.parse(localStorage.getItem('jwt'));
        // console.log('JWT Token:', token);
        
        // JSON.parse(token)
        
        if(!token){
            return res.status(401).send({error : "not Authorised  "})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).send({error : "not Authorised"})
        }
        // console.log(decoded)
        const user = await User_module.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).send({error : "User not found here"});
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error from protect midleware   " , error)
        res.status(500).send(error.message)
    }
}

module.exports = {protectRoute}