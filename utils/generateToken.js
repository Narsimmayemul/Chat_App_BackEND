// const jwt = require('jsonwebtoken');
// const cookie = require('cookie');

// const generateTokenAndSetCookie = (userrId , res)=>{
//     const token = jwt.sign({userrId} , process.env.JWT_SECRET , {
//         expiresIn : '15d'
//     })

//     res.cookie('jwt' , token , {
//         maxAge : 15 * 24 * 60 * 60 * 1000,  // Mili Secound Format
//         httpOnly : true , // this is for preventing attacks which happen doing inspect 
//         sameSite:"strict" , 
//         secure : process.env.NODE_ENV !== "development"

//     });
// }

// module.exports = {generateTokenAndSetCookie};


// const { LocalStorage } = require('node-localstorage');
// const localStorage = new LocalStorage('./local-storage');

// Storing token


// Retrieving token
// const token = localStorage.getItem('jwtToken');
// console.log('JWT Token:', token);


const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./local-storage');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
    localStorage.setItem('jwt', JSON.stringify(token));

    // res.cookie('jwtoken', token, {
    //     maxAge: 15 * 24 * 60 * 60 * 1000,  // milliseconds
    //     httpOnly: false,
    //     sameSite: 'strict',
    //     secure: process.env.NODE_ENV !== "development"
    // });
}

module.exports = { generateTokenAndSetCookie };
