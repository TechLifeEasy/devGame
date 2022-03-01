const axios = require("axios");
// const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Api = axios.create({
  baseURL: "https://quizapi.io/api/v1",
  headers: { "X-Api-Key": process.env.pu_Api },
});

const getRanDom = async (req, res) => {
  try {

    const data=await getRanDomQuiz();

    res.send(data);
  } catch (e) {
    console.log(e.message);
    res.status(404).send();
  }
};

async function getRanDomQuiz(){

    const data = await Api.get("/questions?limit=1");
    // console.log(data.data)

 
    const token = await jwt.sign(JSON.stringify(data.data[0].correct_answers), process.env.Secrete);

    return { ...data.data[0],correct_answers: token };

}

exports.getRanDom = getRanDom;
exports.getRanDomQuiz = getRanDomQuiz;
