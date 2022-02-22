const axios = require("axios");
const brcypt = require("bcryptjs");

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

    const ans = await brcypt.hash(JSON.stringify(data.data[0].correct_answers), 5);

    return { ...data.data[0], correct_answers2:data.data[0].correct_answers,correct_answers: ans, };

}

exports.getRanDom = getRanDom;
exports.getRanDomQuiz = getRanDomQuiz;