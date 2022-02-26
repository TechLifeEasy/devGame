import PreMatch from "../components/play/PreMatch";
import Index from "../components/play/Index";
import { useEffect, useState, useReducer,useLayoutEffect } from "react";
import { io } from "socket.io-client";
import { BsInfo, BsWindowSidebar } from "react-icons/bs";
import { incMatches } from "../Api/Api";

const PORT = "http://127.0.0.1:8080/";

const inits = {
  isFind: true,
  dataPartner: null,
  question: null,
};

function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "isFind":
      return { ...state, isFind: action.data };
    case "dataPartner":
      return { ...state, dataPartner: action.data };
    case "question":
      return { ...state, question: action.data };

    default:
      throw new Error("Invalid");
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, inits);
  const [socket, setSocket] = useState(null);
  
  function init() {
    let socket = io(PORT);
    setSocket(socket)
    console.log('call init')
    socket.emit("join_room", window.localStorage.getItem("info"));
    socket.on("join_me", (room_id, data, question) => {
    console.log(room_id);
    incMatches({email:data.email})
    .then((resp)=>{
      console.log(resp);
    })
    .catch((e)=>{
      console.log(e);
    })
    window.localStorage.setItem("room_id", room_id);
    dispatch({ type: "dataPartner", data: { ...data, room_id: room_id } });
    console.log(data);
    dispatch({ type: "isFind", data: false });
    dispatch({ type: "question", data: question });
    console.log("Donnaa");
    socket.emit("join_room_id", room_id);
    });
  }
  useEffect(() => {
    init();
    
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      {state.isFind ? (
        <PreMatch></PreMatch>
      ) : (
        <Index state={state} dispatch={dispatch} socket={socket}></Index>
      )}
    </div>
  );
}
