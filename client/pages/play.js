import PreMatch from "../components/play/PreMatch";
import Index from "../components/play/Index";
import { useEffect, useState, useReducer, useLayoutEffect } from "react";
import { io } from "socket.io-client";
import { BsInfo, BsWindowSidebar } from "react-icons/bs";
import { incMatches } from "../Api/Api";

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

export default function Home(props) {
  const [state, dispatch] = useReducer(reducer, inits);
  const [socket, setSocket] = useState(null);

  function init() {
    const PORT = process.env.NEXT_PUBLIC_WebLink;

    let socket = io(PORT);

    setSocket(socket);
    console.log("call init");
    socket.emit("join_room", window.localStorage.getItem("info"));
    socket.on("Leave_me", () => {
      window.location.href = "/";
    });
    socket.on("join_me", (room_id, data, question) => {
      console.log(room_id);

      incMatches({ email: data.email })
        .then((resp) => {
          console.log(resp);
        })
        .catch((e) => {
          console.log(e);
        });
      window.localStorage.setItem("room_id", room_id);
      // console.log(data);
      dispatch({ type: "dataPartner", data: { ...data, room_id: room_id } });
      dispatch({ type: "isFind", data: false });
      dispatch({ type: "question", data: question });
      // console.log("Donnaa");
      socket.emit("join_room_id", room_id);
    });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      {/* <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script> */}
      {state.isFind  && state.question ? (
        <PreMatch find={init}></PreMatch>
      ) : (
        <Index
          state={state}
          {...props}
          dispatch={dispatch}
          socket={socket}
        ></Index>
      )}
    </div>
  );
}
