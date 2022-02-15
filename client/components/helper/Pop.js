import React from "react";

export default function Pop({text,setPop}) {
  return (
    <div
      class="bg-black border-yellow-500 text-yellow-500 border-l-4  fixed bottom-3 right-2 flex gap-3"
      role="alert"
    >
      <p className="p-4" >{text}</p>

      <button className="p-4 border-l-2 border-yellow-500 px-6 overflow-hidden transform translate-y-0 hover:bg-yellow-500 hover:text-black duration-500 ease-in-out"
      onClick={()=>setPop(false)}
      >
        x
      </button>
    </div>
  );
}
