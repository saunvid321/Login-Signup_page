const express =require("express");
const bodyParser = require('body-parser');
const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/My-ChatApp')



const port=3000;
const app=express();
const http=require('http').Server(app);

var io=require('socket.io')(http);

const routes=require('./routes/user_routes');



app.use(bodyParser.urlencoded({extended:true}));

app.use('/',routes);


io.on("connection",(socket)=>{
    // socket.emit('chat-message','hellow world')
    console.log("Connected...");
});

app.listen(port,()=>{
    console.log(`server running on port${port}`);
});