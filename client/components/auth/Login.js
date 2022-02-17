import React, { useReducer, useState ,useEffect} from "react";
import { init, reducer  } from "./reducer";
import { getUser, SignIn } from "../../Api/Api";
import Load from "../helper/Load";

export default function LogIn() {

  const [state, dispatch] = useReducer(reducer, init);
  const [load,setLoad]=useState(false);
  useEffect(()=>{
    if(localStorage.getItem("info")!==null){
      window.location.href='/'
    }
  })
  async function AddUser(){
      console.log(state);
      setLoad(true);
      SignIn(state).
      then((resp)=>{
        getUser({email:state.email}).then((resp1)=>{
          const data=resp1.data
          console.log(data);
          window.localStorage.setItem("info",JSON.stringify(data))
          window.location.href='/'
        })
      })
      .catch((e)=>{
        alert("Please Enter valid Credentials")
      })
      .finally(()=>{
        setLoad(false);
      })
      

  }

  return (
    <section className="w-11/12 m-auto  flex flex-col items-center justify-center my-3">
    {load?<Load/>:null}
      <div className="space-y-6 text-white">
        <h1 className="text-center my-3 text-2xl"> Sign In</h1>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 flex gap-3">
          <div className=" flex gap-2">
            <input
              type="email"
              id="user-info-email"
              className=" rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black "
              placeholder="Email"
              value={state.email}
              onChange={(e)=>dispatch({type:"email",data:e.target.value})}
            />
          </div>
       
        </div>

        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="password"
            className=" rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
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
            Log In
          </button>
        </div>
      </div>
    </section>
  );
}
