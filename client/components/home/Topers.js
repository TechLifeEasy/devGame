import React from "react";
import User from "../helper/UserPop";

export default function Topers() {
  return (
    <div
      className="
  flex flex-col items-center justify-center h-full
  gap-4
  lg:w-3/4
  w-full
  text-white
  
  "
    >
      {/* <h1 className="  text-2xl">Dev Game</h1> */}

      <h1 className="mb-4  text-2xl">Today Top Players</h1>

      <DayTopers></DayTopers>

      <button
        className="border-x-2 border-yellow-500 py-3 w-full  overflow-hidden transform translate-y-0 hover:bg-yellow-500 hover:text-black duration-200 ease-in-out
      bg-black text-yellow-500
      "
      >
        <a href="/all">All</a>
      </button>
    </div>
  );
}

function DayTopers() {
  return (
    <div class=" flex  gap-6 mx-auto w-full items-center justify-center  dark:bg-gray-800 rounded-lg shadow">
      <User></User>
      <User></User>
      <User></User>
    </div>
  );
}
