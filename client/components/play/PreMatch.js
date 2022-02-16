import React from "react";

import User from "../helper/UserPop";

export default function PreMatch() {
  return (
    <div className="flex flex-col text-yellow-500 item-center justify-center gap-6">
      <h3 className="text-2xl text-center"> Be Ready for Fun </h3>

      <div className="flex flex-row gap-4 items-center">
        <User></User>
        <div className="text-2xl text-yellow-500">&</div>
        <User></User>
      </div>

      <h3 className="text-2xl text-center"> Loadding ....</h3>
    </div>
  );
}
