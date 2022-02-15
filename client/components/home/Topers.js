import React from "react";

export default function Topers() {
  return (
    <div
      className="
  flex flex-col items-center justify-center h-full
  gap-4
  lg:w-1/4
  w-full
  
  "
    >
      {/* <h1 className="  text-2xl">Dev Game</h1> */}

      <h1 className="  text-2xl">Today Top Players</h1>

      <DayTopers></DayTopers>

      <button className="border-l-2 border-yellow-500 p-3 w-2/3  overflow-hidden transform translate-y-0 hover:bg-yellow-500 hover:text-black duration-200 ease-in-out
      bg-black text-yellow-500
      ">
        <a
          href="/all"
      
        >
           All
        </a>
      </button>
    </div>
  );
}

function DayTopers() {
  return (
    <div class="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul class="flex flex-col divide divide-y">
        <DayToper></DayToper>
        <DayToper></DayToper>
        <DayToper></DayToper>
      </ul>
    </div>
  );
}

function DayToper() {
  return (
    <li class="flex flex-row">
      <div class="select-none cursor-pointer flex flex-1 items-center p-4">
        <div class="flex flex-col w-10 h-10 justify-center items-center mr-4">
          <a href="#" class="block relative">
            <img
              alt="profil"
              src="https://user-images.githubusercontent.com/69882648/150591654-0fa4ded6-3a4f-4c68-b02a-c6c362086256.jpg"
              class="mx-auto object-cover rounded-full h-10 w-10 "
            />
          </a>
        </div>
        <div class="flex-1 pl-1 mr-16">
          <div class="font-medium dark:text-white">Zeel</div>
          <div class="text-gray-600 dark:text-gray-200 text-sm">Gammer</div>
        </div>
      </div>
    </li>
  );
}
