import axios from "axios";

const web = process.env.WebLink || process.env.NEXT_PUBLIC_WebLink;

const API = axios.create({ baseURL: web });

const APIWithToken = axios.create({ baseURL: web });

APIWithToken.interceptors.request.use((req) => {
  if (localStorage.getItem("User")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("User")).data.token
    }`;
  }

  return req;
});

const SingUp = (data) => API.post("/users/sign_up", data);
const SingIn = (data) => API.post("/users/sign_in", data);


export {SingIn,SingUp}