
const { SourceModal } = require('../connections/Schema');;
const { isFound } = require('./source');

/** 
    "title": 'One Path to learn React js',
    "description": 'Hey folks!

This guide is for people who are starting with React. I have carefully curated the best videos and articles in each section to make it easier for learning.
/n
Note: I’m not associated with any of the websites mentioned below. It’s purely my view./n',
    "courses": [
        {
        "link":'https://reactjs.org/tutorial/tutorial.html',
        "about":'Tutorial: Intro to React \n This tutorial doesn’t assume any existing React knowledge.',
    },
        {
        "link":'https://www.youtube.com/watch?v=-mJFZp84TIY&list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt',
        "about":'Complete react course: In this react course, we will see how to use react using projects. React is an amazing library for creating user interfaces
This is going to be a project-based course full of real-world react projects. ',
    },
 

],
    creator: "zeel",
    "tech":'React js'
 * 
 */


const AddSourceInDataBase = async (userName, data) => {

    const isf = await isFound(data.title);
    if (isf) {
        throw new Error('Title Exits');
    }

    const document = new SourceModal({ ...data, creator: userName });
    const user_data = await document.save();

    return { ...user_data._doc };


}


const GetSourcesInDB = async () => {

    const data = await SourceModal.find({}).sort([['createdAt', -1]]);
    return data;


}
const GetSourcesByTitleInDB = async () => {

    const data = await SourceModal.find({}).sort([['createdAt', -1]]);
    return data;


}


/**
 * 
 * type:"vote"
 *  
 */
const UserDataSourceInDB = async (userName, data) => {

    let isf = await SourceModal.findOne({ title: data.title });

    if (isf == null) {
        throw new Error('Title Not Exits');
    }

    if (data.type == "vote") {

        if (isf.upVote.includes(userName)) {
            isf.upVote.remove(userName)

        } else {

            isf.upVote.push(userName)

        }
        let data = await isf.save();
        console.log(data)

    } else {
        throw new Error("Not Vaild Update");
    }

    isf = await SourceModal.findOne({ title: data.title });


    return isf;

}
const DeleteSourceInDB = async (userName, data) => {

    let isf = await SourceModal.findOne({ title: data.title });

    console.log(data)
    if (isf == null) {
        throw new Error('Title Not Exits');
    }

    if(isf.creator!=userName){
        throw new Error('Bhai kay chiting nahi');
    }

    await SourceModal.deleteOne({title:data.title})

    return 'delete'

}

exports.AddSourceInDataBase = AddSourceInDataBase
exports.GetSourcesInDB = GetSourcesInDB
exports.UserDataSourceInDB = UserDataSourceInDB
exports.DeleteSourceInDB = DeleteSourceInDB