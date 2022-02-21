import PreMatch from "../components/play/PreMatch";
import Index from "../components/play/Index";
import { useEffect, useState } from "react";
import {io} from 'socket.io-client';
import { BsInfo } from "react-icons/bs";

const PORT='http://127.0.0.1:8080/';
export default function Home() {
  const [isFind, setIsFInd] = useState(true);
  
  const socket=io(PORT);
  useEffect(() => {
    socket.emit('join_room',window.localStorage.getItem("info"));
    socket.on('join_me',(room_id)=>{
      window.localStorage.setItem("room_id",room_id);
      setIsFInd(false)
      console.log("Donnaa");
      socket.emit('join_room_id',(room_id))
    })
    // setInterval(() => {
    //   setIsFInd(false)
    // }, 5000);
  }, [PORT]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      {isFind ? <PreMatch></PreMatch>:<Index socket={socket}></Index>}
    </div>
  );
}
