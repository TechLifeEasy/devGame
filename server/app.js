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
const PuzzleRouter = require("./routes/puzzle");
const {Main} =require('./socket/index');



if (process.env.NODE_ENV === 'production') {
  console.log = function () { }
}


const app = express();
var server = require('http').createServer(app);


app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
db.Connect();
Main(server)

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/puzzle", PuzzleRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// console.log=()=>{}


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