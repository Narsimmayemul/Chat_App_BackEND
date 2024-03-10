const { User_module } = require("../models/user.model");

const getUsersForSidebar = async(req , res)=>{
try {
    const loggedInUserId = req.user._id;

    const filterUsers = await User_module.find({_id: {$ne : loggedInUserId}}).select("-password")
    res.status(200).send(filterUsers);

} catch (error) {
    console.log('this error from users.controler.js   ' , error.message)
    res.status(500).send({error : "Internal Server Error"})
}
}

module.exports = {getUsersForSidebar}