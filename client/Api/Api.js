import axios from "axios";

const web =
  process.env.WebLink ||
  process.env.NEXT_PUBLIC_WebLink ||
  "https://devgamie.herokuapp.com/";

const API = axios.create({ baseURL: web });
console.log(web);
const APIWithToken = axios.create({ baseURL: web });

APIWithToken.interceptors.request.use((req) => {
  if (localStorage.getItem("User")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("User")).data.token
    }`;
  }

  return req;
});

const SignUp = (data) => API.post("/users/signup", data);
const SignIn = (data) => API.post("/users/signin", data);
const getOtp = (data) => API.post("/users/otp", data);
const getUser = (data) => API.post("/users/byemail", data);
const getAll = () => API.get("/users/all");
const getQuiz = () => API.get("/puzzle");

export { SignIn, SignUp, getOtp, getUser, getQuiz,getAll};
