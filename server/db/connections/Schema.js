require('dotenv').config();
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    bio: String,
    image: String,
    email: String,
    password: String,
    github: String,
    twitter: String,
    linkedin: String,
    discord: String,
    resume: String,
    website: String,
}, { versionKey: false, timestamps: true });

var CommentSchema = new Schema({
    name:String,
    commentLike:[String],
}, { versionKey: false, timestamps: true });


const ProjectSchema = new Schema({
    title: String,
    description: String,
    tech: String,
    demoLink: String,
    upVote: [String],
    // comment: [CommentSchema],
    creator: String,
    state:String,
    // isIdea:Boolean
}, { versionKey: false, timestamps: true });



const FindSchema = new Schema({
    name: String,
    creator: String,
    tech: String,
    link: String,
    contact:String
}, { versionKey: false, timestamps: true });



const SourceSchema = new Schema({
    title: String,
    description: String,
    courses: [{
        link:String,
        about:String,
    }],
    upVote: [String],
    comment: [CommentSchema],
    creator: String,
    tech:String
}, { versionKey: false, timestamps: true });





exports.UserModal = mongoose.model('devBoss.UserModal', UserSchema);
exports.ProjectModal = mongoose.model('devBoss.ProjectModal', ProjectSchema);
exports.CommentModal = mongoose.model('devBoss.CommentModal', CommentSchema);
exports.FindModal = mongoose.model('devBoss.FindModal', FindSchema);
exports.SourceModal = mongoose.model('devBoss.SourceModal', SourceSchema);


