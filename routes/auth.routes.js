const express = require('express');
const {loginUser , SignUpUser , logOutUser} = require("../controlers/auth.controler.js")
const router = express.Router();

router.post("/signup" , SignUpUser)


router.post("/login" , loginUser)


router.post("/logout" , logOutUser);


module.exports= router;