import React from "react";

export default function Chat() {
  return (
    <div className="w-1/4 flex-1 h-full flex flex-col  border-l-2 border-yellow-500">
      <h1 className="text-2xl transform text-yellow-500 translate-y-0 hover:translate-y-2 duration-500 ease-in-out uppercase font-black flex gap-2 items-center justify-center ">
        Chat Box
      </h1>

      <Chats></Chats>

      <div class="flex relative  ">
       
        <input
          type="text"
          id="email-with-icon"
          class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          name="email"
          placeholder="Your email"
        />
         <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
        
        </span>
      </div>
    </div>
  );
}

function Chats() {
  return (
    <div className="flex-2 h-full p-5">
      <ChatPop></ChatPop>
    </div>
  );
}

function ChatPop() {
  return <div>zeel is best</div>;
}
