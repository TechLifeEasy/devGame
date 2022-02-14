// import jwt from "jsonwebtoken";
// import mongoose from 'mongoose';

const secret = process.env.password;

const auth = async (req, res) => {
    console.log("Call")
    try {
      // console.log(req.headers)
      const token = req.headers.adminkey;
      // console.log(secret,token)
     
      return token===secret;

    } catch (error) {
      return false;
    }
};

exports.auth=auth;
