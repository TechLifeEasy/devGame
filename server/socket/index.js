const { Server } = require("socket.io");
const { getRanDomQuiz } = require("../db/Puzzle/index");

function Main(server) {
  let queue = [];
  let map=new Set();
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`id: ${socket.id} user comes `);

    socket.on("join_room", (data) => {
      let info = JSON.parse(data);
      info.socket_id = socket.id;

      console.log(map)

      if (queue.length === 0) {
        info.room_id = socket.id + " " + generateOTP();
        queue.push(info);
        map.add(info._id);
      } else {

        if(map.has(info._id)){
          socket.emit("Leave_me");
          return;
        }

        let user = queue.pop();
        map.delete(user._id);
        info.room_id = user.room_id;
        getRanDomQuiz()
          .then((data) => {
            socket.emit("join_me", user.room_id, user, data);
            socket.to(user.socket_id).emit("join_me", user.room_id, info, data);
          })
          .catch((e) => {
            console.log(e);
          });
      }

      console.log(queue);
    });

    socket.on("join_room_id", (room_id) => {
      console.log("finally");
      socket.join(room_id);
    });

    socket.on("mess", (data) => {
      console.log('call mess');
      console.log(data);
      io.to(data.room_id).emit("message_other", data);
    });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected");
    // });
    
    socket.on("change_que",(que,room_id)=>{
      console.log("Inside server que",room_id);
      socket.broadcast.emit("new_question", que,room_id);
    })
    socket.on("AnsChange",(data)=>{
      console.log('call ans change')
      console.log(data)
      io.to(data.room_id).emit("changeAns", data);
    })

    socket.on("change_chance",(room_id,chance)=>{      
      io.to(room_id).emit("new_chance",room_id,chance);
    })

    socket.on("change_rating",(data)=>{
      console.log("Second",data.room_id);
      let socket_id=data.room_id.split(" ")[0];
      io.to(data.room_id).emit("new_rating",{rating:data.rating,room_id:data.room_id});
    })

    socket.on("left-room",(data)=>{
      io.to(data.room_id).emit("left",data);
    })

    socket.on("disconnect", () => {
      io.emit("user-net-gaya",{id:socket.id})
    });

    

    // socket.on("callUser", (data) => {
    //     io.to(data.userToCall).emit('hey', {signal: data.signalData, from: socket.id});
    // })

    // socket.on("acceptCall", (data) => {
    //     io.to(data.to).emit('callAccepted', data.signal);
    // })
  });
}

function generateOTP() {
  var string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let OTP = "";
  var len = string.length;
  for (let i = 0; i < 6; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
}
exports.Main = Main;
