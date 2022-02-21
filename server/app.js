const createError = require("http-errors");
const express = require("express");
const path = require("path");


require("dotenv").config()
var cors = require('cors')
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const port = process.env.PROT || 8080;
const db = require("./db/connections/DataBaseConnection");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

let queue=[]

if (process.env.NODE_ENV === 'production') {
  console.log = function () { }
}


const app = express();
var server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
  origin:'*'
  }});

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
db.Connect();

app.use("/", indexRouter);
app.use("/users", usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// console.log=()=>{}

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join_room',(data)=>{
    let info=JSON.parse(data)
    info.socket_id=socket.id;
    
    if(queue.length===0){
        info.room_id=generateOTP();
        room_id=info.room_id
        queue.push(info)
        
    }else{
        let user=queue.pop();
        info.room_id=user.room_id;
        room_id=info.room_id
        socket.emit("join_me",user.room_id)
        socket.to(user.socket_id).emit("join_me",user.room_id)
    }
    queue.map((data)=>{
      console.log(data);
    })
    
  })

  socket.on('join_room_id',(room_id)=>{
    console.log("finally");
    socket.join(room_id);
  })

  socket.on("mess",(data)=>{
    console.log(data.room_id);
    socket.broadcast.emit('message_other',data);
  })

  socket.on('disconnect',()=>{
    console.log("Disconnected");
  })
  

});

if (process.env.NODE_ENV === 'production') {
  const { PORT = 3000, LOCAL_ADDRESS = '0.0.0.0' } = process.env
  server.listen(PORT, LOCAL_ADDRESS, () => {
    const address = server.address();
    console.log('server listening at', address);
  });
} else {

  const port = process.env.PROT || 8080;

  server.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
  })
}


function generateOTP() {
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let OTP = '';
  var len = string.length;
  for (let i = 0; i < 6; i++ ) {
      OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
}