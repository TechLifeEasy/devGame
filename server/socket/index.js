const { Server } = require("socket.io");

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
        info.room_id = socket.id+" "+generateOTP();
        queue.push(info);
      } else {
        let user = queue.pop();
        info.room_id = user.room_id;
        socket.emit("join_me", user.room_id,user);

        socket.to(user.socket_id).emit("join_me", user.room_id,info);
      }

      console.log(queue)

    });

    socket.on("join_room_id", (room_id) => {
      console.log("finally");
      socket.join(room_id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
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
exports.Main = Main;
