import React, { useReducer, useState } from "react";
import { init, reducer  } from "./reducer";


export default function Signin() {

  const [state, dispatch] = useReducer(reducer, init);

  function AddUser(){
      console.log(state);
  }

  return (
    <section className="w-11/12 m-auto  flex flex-col items-center justify-center my-3">
      <div className="space-y-6 text-white">
        <h1 className="text-center my-3 text-2xl"> Sign In</h1>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 flex gap-3">
          <div className=" flex gap-2">
            <input
              type="email"
              id="user-info-email"
              className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
              placeholder="Email"
              value={state.email}
              onChange={(e)=>dispatch({type:"email",data:e.target.value})}
            />
          </div>
          <div className="text-center ">
            <button
              type="button"
              className="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2"
            >
              📩 OTP
            </button>
          </div>
        </div>

        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="text"
            className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
            placeholder="OTP"
            value={state.otp}
             onChange={(e)=>dispatch({type:"otp",data:e.target.value})}
          />
        </div>
        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="text"
            className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
            placeholder="Name"
            value={state.name}
             onChange={(e)=>dispatch({type:"name",data:e.target.value})}
          />
        </div>
        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="password"
            className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
            placeholder="password"
            value={state.password}
             onChange={(e)=>dispatch({type:"password",data:e.target.value})}
          />
        </div>

        {/* </div> */}

        <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-2/3">
          <button
            type="submit"
            className="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2"

             onClick={AddUser}
          >
            Sing In
          </button>
        </div>
      </div>
    </section>
  );
}
