import PreMatch from "../components/play/PreMatch";
import Index from "../components/play/Index";
import { useEffect, useState,useReducer } from "react";
import {io} from 'socket.io-client';

const PORT='http://127.0.0.1:8080/';

const inits={
  isFind:true,
  dataPartner:null
}

function reducer(state, action) {

  console.log(action)

  switch (action.type) {
    case "isFind":
      return { ...state, isFind: action.data };
    case "dataPartner":
      return { ...state, dataPartner: action.data };
    default:
      throw new Error("Invalid");
  }
}




export default function Home() {

  const [state, dispatch] = useReducer(reducer, inits);
 

  function init(){
    const socket=io(PORT);
      socket.emit('join_room',window.localStorage.getItem("info"));
      socket.on('join_me',(room_id,data)=>{
        console.log(room_id)
        dispatch({type:"dataPartner",data:data});
        console.log(data)
        dispatch({type:"isFind",data:false})
        console.log("Donnaa");
        socket.emit('join_room_id',(room_id))
      })
  }
  
  
  useEffect(() => {

    init()
  
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      {state.isFind ? <PreMatch></PreMatch>:<Index state={state} dispatch={dispatch}></Index>}
    </div>
  );
}

