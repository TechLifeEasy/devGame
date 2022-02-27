const express = require("express");
const router = express.Router();
const { UserModal } = require("../db/connections/Schema");
const { auth } = require("../middleware/auth");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isUserAlreadyExist, EmailWithPassword } = require("../users/index");
const otpGenerator = require('otp-generator')
let  SMTPClient  =require('emailjs');
// var nodemailer = require('nodemailer');

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
    // if(req.otp!==OTP){
    //   return res.status(404).send("OTP Invalid");
    // }
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

router.post("/otp",async(req,res)=>{
  try {
    const data=req.body;
    console.log(data)
    const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const client = new SMTPClient({
      user: process.env.mail,
      password: process.env.password_mail,
      host: 'smtp.gmail.com',
      ssl:true
    });
    try{
      const message = await client.sendAsync({
           text: `OTP:${otp}`,
           from: process.env.mail,
           to: email,
           subject: 'Dev Game OTP'
    ,
      });
      }
    catch(e){
      return res.status(400).send(JSON.stringify({ message:"Error" }))
      
    }
    return res.status(200).send({otp})
  }
  catch(e){
      console.log(e);
      return res.status(500).send("Error: "+e)
  }
});

router.post("/byemail",async (req,res)=>{
  try {
  const data=req.body;
  const user=await UserModal.findOne({email:data.email});
  if (user) {
    return res.status(200).send(user);
  }else{
    return res.status(500).send("error");
  }
  } catch (error) {
    return res.status(500).send(error);  
  }
})

router.get("/all",async (req,res)=>{
  try {
  let data=await UserModal.find().sort({"rating":-1});
  res.status(200).send(data); 
  } catch (error) {
    console.log(error);
  }
})

router.post("/update",async (req,res)=>{
  try {
    const email=req.body.email;
    const rat=+req.body.rating;
    console.log(rat)
    const resp=await UserModal.findOneAndUpdate(
      {email},
      {
        $inc:{rating:rat},
      
      },{
        useFindAndModify:false
      }
      )
    await UserModal.findOneAndUpdate(
      {email},
      {
      
        $inc:{matches:1}
      },{
        useFindAndModify:false
      }
      )
    
    if(resp){
      res.status(200).send("Done Updating Score")
    }else{
      res.status(404).send("Some Error Occurred in Updating Score");
    }
  } catch (error) {
    console.log(error);
  }
})

router.post('/rating',async (req,res)=>{
  try {
    const email=req.body.email;
    console.log(req.body);
    const user=await UserModal.findOne({email});
    if(user){
      return res.status(200).send({rating:user.rating})
    }else{
      return res.status(500).send('Some error occured in feching rating')
    }
  }catch (error) {
    return res.status(500).send(error);
    }
});

router.post('/matches',async (req,res)=>{
  try {
    const email=req.body.email;
    console.log(req.body);
    const user=await UserModal.findOne({email});
    if(user){
      return res.status(200).send({matches:user.matches})
    }else{
      return res.status(500).send('Some error occured in feching matches')
    }
  }catch (error) {
    return res.status(500).send(error);
    }
})

router.put('/incmatch',async(req,res)=>{
  try {
  const email=req.body.email;
  const resp=await UserModal.findOneAndUpdate(
    {email},
    {$inc:{matches:1}},{useFindAndModify:false})
    if(resp)
    return res.status(200).send("Done Match Inc");
    else
    return res.status(404).send(`Some Error occured ${resp} `);
    } 
    catch (error) {
      console.log(error);}
    return res.status(404).send(error);
})
  

module.exports = router;

