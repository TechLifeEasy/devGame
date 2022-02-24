const { Server } = require("socket.io");
const { getRanDomQuiz } = require("../db/Puzzle/index");

function Main(server) {
  let queue = [];
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

      if (queue.length === 0) {
        info.room_id = socket.id + " " + generateOTP();
        queue.push(info);
      } else {
        let user = queue.pop();
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
      console.log(data.room_id);
      io.to(data.room_id).emit("message_other", data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
    socket.on("change_que",(que,room_id)=>{
      console.log("Inside server que",room_id);
      socket.broadcast.emit("new_question", que,room_id);
    })
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
