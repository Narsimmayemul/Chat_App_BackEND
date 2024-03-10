const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const generateTokenAndSetCookie = (userrId , res)=>{
    const token = jwt.sign({userrId} , process.env.JWT_SECRET , {
        expiresIn : '15d'
    })

    res.cookie('jwt' , token , {
        maxAge : 15 * 24 * 60 * 60 * 1000,  // Mili Secound Format
        httpOnly : true , // this is for preventing attacks which happen doing inspect 
        sameSite:"strict" , 
        secure : process.env.NODE_ENV !== "developement"
    });
}

module.exports = {generateTokenAndSetCookie}