const express = require('express');
const router = express.Router();
const {UserModal}=require('../db/connections/Schema');
const brcypt=require('bcryptjs');


const isUserAlreadyExist=async(email)=>{
    try {
        const resp=await UserModal.findOne({email});
        // console.log("dsd"+resp);
        return resp!==null;
    } catch (error) {
        console.log(error);
    }
}

const EmailWithPassword=async(email,password)=>{
    try {
        const resp=await UserModal.findOne({email})
        if(!resp)
            return false
        const pass=await resp.password;
        const isPasswordValid=await brcypt.compare(password,pass);
        // console.log(pass+" "+password);
        return isPasswordValid;
    } catch (error) {
        console.log(error);
        return false
    }
}

exports.isUserAlreadyExist=isUserAlreadyExist;
exports.EmailWithPassword=EmailWithPassword;