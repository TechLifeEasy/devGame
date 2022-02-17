import React, { useEffect, useState } from "react";
import User from "../helper/UserPop";
import { GoHubot } from "react-icons/go";


export default function Users() {
 
  const data = { isPlay: true};

  return (
    <div className="flex  flex-1  flex-col gap-4 items-center  border-r-2 border-yellow-500">
      <div className="transform text-yellow-500 translate-y-0 hover:translate-y-2 duration-500 ease-in-out  uppercase font-black flex gap-2 items-center justify-center">
        <GoHubot></GoHubot>
        <div>devGame</div>
      </div>
      <User {...data}></User>
      <div className="text-2xl text-yellow-500">&</div>
      <User {...data}></User>
    </div>
  );
}
