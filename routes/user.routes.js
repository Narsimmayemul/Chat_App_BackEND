const express = require("express");
const { protectRoute } = require("../midleware/protectRoute");
const { getUsersForSidebar } = require("../controlers/users.controler");
const router = express.Router();

router.get("/" ,protectRoute ,getUsersForSidebar)


module.exports = router