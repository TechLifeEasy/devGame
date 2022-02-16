import React from "react";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="w-full cursor-pointer  mx-auto px-6 flex items-center justify-between   bg-black text-yellow-500 py-4 border-yellow-500 border-t-2 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-3">
        <div className="flex items-center justify-center">
          <nav className="font-sen   uppercase text-lg lg:flex items-center hidden">
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
              href="/about-us"
              className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
            >
              About Us
            </a>

            <a
              href="/"
              className="  px-6 flex max-w-md mx-auto overflow-hidden md:max-w-2xl my-5 transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out "
            >
              <BsGithub></BsGithub>
            </a>
          </nav>
        </div>
        <div   className="text-center text-2xl px-6  transform translate-y-0 hover:translate-y-2 duration-500 ease-in-out ">
          Developers
        </div>
        <div className="flex gap-3 flex-wrap my-4 items-center justify-center">
          <User></User>
          <User></User>
          <User></User>
        </div>
        <div className="text-center my-4">
          © 2022 DevGame™. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

function User() {
  return (
    <div  className="shadow-lg rounded-2xl text-white bg-black dark:bg-gray-800 p-4 hover:bg-black hover:text-yellow-500 border-2 hover:border-yellow-500 hover:translate-y-2 duration-500 ease-in-out">
      <div  className="flex justify-center items-center">
        <div  className="flex-shrink-0">
          <a href="https://github.com/zeel-codder"  className="block relative">
            <img
              alt="profil"
              src="https://avatars.githubusercontent.com/u/69882648?s=400&u=e9526eba272dd4d85df2e56411b57b7ab94659d5&v=4"
               className="mx-auto object-cover rounded-full h-16 w-16 "
            />
          </a>
        </div>
        <div  className="mt-2 text-center flex flex-col mx-2">
          <span  className="dark:text-white text-lg font-medium">
            Zeel
          </span>
       
        </div>
      </div>
    </div>
  );
}
