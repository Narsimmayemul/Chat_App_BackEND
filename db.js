const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const connection = async()=>{
    try {
       await mongoose.connect(url)
        console.log("connection to DB")
    } catch (error) {
        console.log('error from mongo db connection    ', error.message)
    }
}

module.exports = {connection};