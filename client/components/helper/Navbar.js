import React,{useState,useEffect} from "react";
import { GoHubot } from "react-icons/go";
import { BsReverseLayoutSidebarInsetReverse } from "react-icons/bs";

export default function Navbar() {
  const [auth,setAuth]=useState(
    true);
  useEffect(() => {
    if (window.localStorage.getItem("info")!==null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  })
  
  return (
    <div className="w-full cursor-pointer  mx-auto px-6 flex items-center justify-between   bg-black text-yellow-500 py-4">
      <div className="transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out  uppercase font-black flex gap-2 items-center justify-center">
        <GoHubot></GoHubot>
        <div>devGame</div>
      </div>
      <div className="flex items-center">
        <nav className="font-sen   uppercase text-lg lg:flex items-center hidden">
          {auth?<>
          <a
            href="/auth/login"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
          >
            Log In
          </a>
          <a
            href="/auth/signin"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
          >
            Sign In
          </a>
          </>:<>
          <a
            href="/"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
          >
            Home
          </a>
          <a
            href="/play"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
          >
            Play
          </a>
          <a
            href="/user/zeel"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
          >
          {JSON.parse(window.localStorage.getItem("info")).name}
            
          </a>
          
            <a href="/auth/signout"
            className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out ">
            Sign Out
            </a>
          </>}
          
          <BsReverseLayoutSidebarInsetReverse
            className="lg:hidden visible"
            size={25}
          ></BsReverseLayoutSidebarInsetReverse>
        </nav>
      </div>
    </div>
  );
}
