import React,{useState,useEffect} from "react";

import User from "../helper/UserPop";

export default function PreMatch({find,socket}) {

  const [user,setUser]=useState(false);
  const [total,setTotal]=useState(false);

  useEffect(()=>{
    if(socket){
      socket.emit('getTotal');
      socket.on("total",(num)=>{
        setTotal(num)
      })
    }

  },[socket])


  


  return (
    <div className="flex flex-col text-yellow-500 item-center justify-center gap-6">
      <h3 className="text-2xl text-center"> Be Ready for Fun </h3>
      {
        total

        &&

        <h3 className="text-2xl text-center"> User Waiting: {total} </h3>
      }

      <div className="flex flex-row gap-4 items-center">
        <User></User>
       
      </div>
        <button
        className="border-x-2 border-yellow-500 py-3 w-full  overflow-hidden transform translate-y-0 hover:bg-yellow-500 hover:text-black duration-200 ease-in-out
      bg-black text-yellow-500" onClick={()=>{

        setUser(true)
        
        find()
        }} >

        Find
      </button>

      {

        user
        &&
        
        <h3 className="text-2xl text-center"> Loadding ....</h3>
      }
    </div>
  );
}