const express = require('express');
const {sendMessage , getMessages}= require("../controlers/message.controler");
const { protectRoute } = require('../midleware/protectRoute');
const router = express.Router();

router.post("/send/:id" , protectRoute , sendMessage);
router.get("/:id" , protectRoute , getMessages);

module.exports = router; 

