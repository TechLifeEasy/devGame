import React from "react";
import Topers from "./Topers";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className=" flex flex-col gap-10 bg-black">
      <div className="w-full py-10  flex gap-3 flex-wrap items-center justify-center">
        {/* <Image
          src="/img/top.svg"
          alt="Picture of the author"
          width={600}
          height={500}
        /> */}

        <Topers></Topers>
      </div>
      <div className="text-center text-white">
        <h1 className="text-2xl"> How To Play game?</h1>
        <Path></Path>
      </div>
   
      
    </div>
  );
}

function Path() {
  return (
    <div class="sm:flex flex-wrap justify-center items-center text-center gap-8">
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4  text-white mt-6  shadow-lg rounded-lg   hover:translate-y-2 duration-500 ease-in-out">
        <div class="flex-shrink-0">
          <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="h-6 w-6"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl sm:text-xl   font-semibold dark:text-white py-4">
          Create The Account
        </h3>
        <p class="text-md     dark:text-gray-300 py-4">
          we have sign up with email verification function in our app. you while get opt and than you can enter in the app.
        </p>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 text-white mt-6 sm:mt-16 md:mt-20 lg:mt-24  shadow-lg rounded-lg   hover:translate-y-2 duration-500 ease-in-out">
        <div class="flex-shrink-0">
          <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="h-6 w-6"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl sm:text-xl   font-semibold dark:text-white py-4">
          Find the Player
        </h3>
        <p class="text-md    dark:text-gray-300 py-4">
          Goto Play ground of app. than click on find and just wait onther user to connect. than ready for fun.
        </p>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 text-white py-4 shadow-lg rounded-lg   hover:translate-y-2 duration-500 ease-in-out">
        <div class="flex-shrink-0">
          <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="h-6 w-6"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
            </svg>
          </div>
        </div>
        <h3 class="text-2xl sm:text-xl   font-semibold dark:text-white py-4">
          Game
        </h3>
        <p class="text-md     dark:text-gray-300 py-4">
          Game is Simple you and your patnere have to solve the basic mcq related cse and get the point.
        </p>
      </div>
    </div>
  );
}


