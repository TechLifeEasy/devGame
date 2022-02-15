import React, { useReducer, useState } from "react";
import { init, reducer  } from "./reducer";


export default function LogIn() {

  const [state, dispatch] = useReducer(reducer, init);

  function AddUser(){
      console.log(state);
  }

  return (
    <section className="w-11/12 m-auto bg-gray-100 bg-opacity-50 flex flex-col items-center justify-center my-3">
      <div className="space-y-6 bg-white">
        <h1 className="text-center my-3 text-2xl"> Sign In</h1>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 flex gap-3">
          <div className=" flex gap-2">
            <input
              type="email"
              id="user-info-email"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent "
              placeholder="Email"
              value={state.email}
              onChange={(e)=>dispatch({type:"email",data:e.target.value})}
            />
          </div>
       
        </div>

        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="password"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="password"
            value={state.password}
             onChange={(e)=>dispatch({type:"password",data:e.target.value})}
          />
        </div>

        {/* </div> */}

        <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-2/3">
          <button
            type="submit"
            className="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black  focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "

             onClick={AddUser}
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
}
