const {Conversation} = require("../models/conversation.model")
const {Message} = require("../models/message.model")

const sendMessage = async (req ,res)=>{
try {
    const {message} = req.body;
    const {id : reciverId}=req.params;
    const senderId = req.user._id;

    var conversation = await Conversation.findOne({
        participants : {$all : [senderId , reciverId]},

    })

    if(!conversation){
        conversation = await Conversation.create({
            participants : [senderId , reciverId],
        })
    }

    const newMessage = new Message({
        senderId,
        reciverId,
        message,
    })

    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
    // will add socket.io for real time messages  


    // await conversation.save()
    // await newMessage.save()

    //this will run parallel and take less time
    await Promise.all([conversation.save() , newMessage.save()])
    res.status(201).send(newMessage);
} 

catch (error) {
    console.log("Error in send message function   " , error)
    res.status(500).send({error : 'Internle server Error'})
}
}



const getMessages = async(req , res)=>{
try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;
    
    const conneversation = await Conversation.findOne({
        participants:{$all : [senderId , userToChatId]}
    }).populate("messages"); 

    if(!conneversation) return res.status(200).send([]);
    
    const messages = conneversation.messages;

    res.status(200).send(messages);
} catch (error) {
    console.log("this error from get message function msg controler   " , error);
    res.status(402).send("Internal server error")
}
}
module.exports= {sendMessage , getMessages}