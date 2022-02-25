require('dotenv').config();
const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    bio: String,
    image: String,
    email: String,
    password: String,
    github: String,
    rating:Number,
    matches:Number
}, { versionKey: false, timestamps: true });





exports.UserModal = mongoose.model('devgame.usermodal', UserSchema);

