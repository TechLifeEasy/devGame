const jwt=require("jsonwebtoken");
// import mongoose from 'mongoose';

const secret = process.env.Secrete;

const auth = async (req, res,next) => {
    try {
      console.log(req.headers)
      const token = req.headers.authorization.split(" ")[1];
      
      let decodedData;
      
      decodedData = jwt.verify(token, secret);
      
      console.log(decodedData)
      req.userId = decodedData?._id;
      req.userName=decodedData?.name;
      
      // console.log(decodedData instanceof mongoose.Modal)
      // return ;
      console.log('call auth')
      next()

    } catch (error) {
      console.log(error);
    // Code from the Express middleware
    }
};

exports.auth=auth;
