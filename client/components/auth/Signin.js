import React, { useReducer, useState,useEffect } from "react";
import { init, reducer  } from "./reducer";
import {getOtp, SignUp} from '../../Api/Api'
import Load from '../helper/Load'

import emailjs from '@emailjs/browser';


export default function Signin() {
  
  const [state, dispatch] = useReducer(reducer, init);
  const [Otp, setOtp] = useState("")
  const [load,setLoad] =useState(false);
  useEffect(()=>{
    if(localStorage.getItem("info")!==null){
      window.location.href='/'
    }
  })
  // name: String,
  // bio: String,
  // image: String,
  // email: String,
  // password: String,
  // github: String,

  async function AddUser(e){
    e.preventDefault()
    console.log(state);
    setLoad(true);
    if(state.otp!==Otp){
      setLoad(false);
      alert("You've entered wrong otp")
      return;
    }
    SignUp(state).
    then((resp)=>{
      if(resp.status===200){
        console.log(resp);
        localStorage.setItem("info",JSON.stringify(resp.data));
        window.location.href='/';
      }else{
        alert("Some Error occured please try again !!")
      }
    }).
    catch((e)=>{
      alert("Error",e.message)
    }).
    finally(()=>{
      setLoad(false);
    })

    
    
  }
  function generateOTP() {
          
    // Declare a string variable 
    // which stores all string
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    // Find the length of string
    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}
  async function SendOtp(e){

    
    // e.preventDefault();
    try{

      if(state.email===null){
        alert("Email field empty")
        return;
      }
      // const resp=await getOtp({email:state.email})
      // console.log(resp);
      // if(resp.status===200){
      //   setOtp(resp.data.otp)
      // }
      // const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
      const otp=generateOTP()
      emailjs.send('service_vw4pxol', 'template_muhwzc5', {otp:otp,email:state.email}, 'user_XSA0W9Igma8yKzhDg8kJ3')
      .then((result) => {
          console.log(result.text);
          setOtp(otp)
      }, (error) => {
          console.log(error.text);
      });
    }catch(e){
      console.log(e)
    }
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
              name="email"
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
              onClick={SendOtp}
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
            placeholder="Password"
            value={state.password}
             onChange={(e)=>dispatch({type:"password",data:e.target.value})}
          />
        </div>

        <div className=" flex gap-2 w-11/12 m-auto">
          <input
            type="text"
            className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
            placeholder="Github Link"
            value={state.link}
             onChange={(e)=>dispatch({type:"github",data:e.target.value})}
          />
        </div>

        <div className=" flex gap-2 w-11/12 m-auto">
          <textarea
            rows={5}
            className="rounded-lg border-transparent flex-1 appearance-none   w-full py-2 px-4  text-white placeholder-text-white shadow-sm text-base border-yellow-500 border-2 bg-black"
            placeholder="Some words describing you"
            value={state.bio}
             onChange={(e)=>dispatch({type:"bio",data:e.target.value})}
          />
        </div>
        {/* </div> */}

        <div className="w-full pb-4 ml-auto text-gray-500 flex  justify-end px-4">
          <a
             href="/auth/login"
            className="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md  border-yellow-500 border-x-2"

            
          >
            Login Hear
          </a>
        </div>

        <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-2/3">
          <button
            type="submit"
            className="py-2 px-4 items-center   hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2"

             onClick={AddUser}
          >
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
}
