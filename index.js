const express = require('express');
const app = express();
const env = require('dotenv');
app.use(express.json())
const authRoutes = require("./routes/auth.routes")
env.config();
const {connection} = require('./db')
const PORT = process.env.PORT || 500;
const {User_module} = require('./models/user.model');
const messageRoutes = require("./routes/message.routes")
const userRoutes = require("./routes/user.routes")
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require('cors');
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true // Allow cookies to be sent
};
app.use(cors(corsOptions));

app.get("/" ,async (req , res)=>{
    try {
        // http://localhost:8000/
        res.send('this is home page')
    } catch (error) {
        console.log(error)
    }
})

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);


app.listen(PORT , ()=>{
        connection();
        console.log(`server is runnig on port ${PORT} `)})