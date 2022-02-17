const express = require("express");
const router = express.Router();
const { UserModal } = require("../db/connections/Schema");
const { auth } = require("../middleware/auth");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isUserAlreadyExist, EmailWithPassword } = require("../users/index");
const otpGenerator = require('otp-generator')
var nodemailer = require('nodemailer');
let OTP="";
/* GET home page. */
// router.get('/',Users );

// name: String,
// bio: String,
// image: String,
// email: String,
// password: String,
// github: String,

router.post("/signup", async (req, res) => {
  try {
    let data = req.body;
    // console.log(data);
    const isEmailValid = await isUserAlreadyExist(data.email);
    if (isEmailValid) {
      return res.status(404).send("Email Already Exist");
    }
    if(req.otp!==OTP){
      return res.status(404).send("OTP Invalid");
    }
    const password = await brcypt.hash(data.password, 15);
    data = { ...data, password };

    delete data.otp;

    const token = await jwt.sign(data, process.env.Secrete);
    console.log(token);

    let user = await UserModal(data);
    let resp = await user.save();

    if (resp) {
      resp = { ...resp._doc, token };
      return res.status(200).send(resp);
    } else return res.status(404).send("Some Error occured");
  } catch (e) {
    console.log(e);
    return res.status(404).send("Error:" + e);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const data = req.body;

    const isEmailExist = await EmailWithPassword(data.email, data.password);
    if (!isEmailExist) {
      return res.status(404).send("Email Not Exist");
    }
    const email = data.email;
    const user = await UserModal.findOne({ email });
    // console.log(user);
    const token = await jwt.sign(JSON.stringify(user), process.env.Secrete);

    return res.status(200).send({ ...user._doc, token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/otp",(req,res)=>{
  try {
    const data=req.body;
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'developer9018@gmail.com',
        pass: 'dhruvil@01'
      }
    });

var mailOptions = {
  from: 'developer9018@gmail.com',
  to: `${data.email}`,
  subject: 'Sending Email using Node.js',
  html: `<h4>Thanks for Visiting our website!<h4><p>Your otp:${otp}</p>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    OTP=otp;
    return res.status(200).send({otp})

  }
});

  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
