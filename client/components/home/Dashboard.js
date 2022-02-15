import React from "react";
import Topers from "./Topers";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="mb-10 flex flex-col gap-5">
      <div className="w-full py-10  flex gap-3 flex-wrap items-center justify-center">
        {/* <Image
          src="/img/top.svg"
          alt="Picture of the author"
          width={600}
          height={500}
        /> */}

        <Topers></Topers>
      </div>
      <div className="text-center">
        <h1 className="text-2xl"> How To Play?</h1>
        <Path></Path>
      </div>
   
        <FAQs></FAQs>
      
    </div>
  );
}

function Path() {
  return (
    <div class="sm:flex flex-wrap justify-center items-center text-center gap-8">
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  shadow-lg rounded-lg dark:bg-gray-800 hover:translate-y-2 duration-500 ease-in-out">
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
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
          Website Design
        </h3>
        <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
          Encompassing today’s website design technology to integrated and build
          solutions relevant to your business.
        </p>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800 hover:translate-y-2 duration-500 ease-in-out">
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
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
          Branding
        </h3>
        <p class="text-md text-gray-500 dark:text-gray-300 py-4">
          Share relevant, engaging, and inspirational brand messages to create a
          connection with your audience.
        </p>
      </div>
      <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white shadow-lg rounded-lg dark:bg-gray-800 hover:translate-y-2 duration-500 ease-in-out">
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
        <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
          SEO Marketing
        </h3>
        <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
          Let us help you level up your search engine game, explore our
          solutions for digital marketing for your business.
        </p>
      </div>
    </div>
  );
}

function FAQs() {

    return(

    
  <div class="max-w-screen-xl mx-auto p-8 flex flex-col items-center">
    <h2 class="text-3xl font-extrabold leading-9 border-b-2 border-gray-100 text-gray-900 mb-12">
      FAQs
    </h2>
    <ul class="flex m-auto items-start  flex-wrap">
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          What is a home energy rating?
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            A home energy rating is an estimated calculation into a homes
            potential energy usage, which will determine the amount of heating
            and cooling required to make its occupants comfortable. It produces
            a star rating dependant on the amount of heating and cooling loads
            which will be required, from 0 to 10 stars.
          </p>
        </p>
      </li>
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          Why do I need a 6 Star energy rating?
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            In most Australian states the government requires that all new homes
            and apartments (along with certain types of building extensions)
            built since 2010 be energy rated and achieve a minimum of 6 Stars.
          </p>
        </p>
      </li>
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          What is the general cost of an energy rating?
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            Simple energy rating prices vary greatly on the size and type of
            building, generally an energy rating will cost somewhere between
            $130 to $700+.
          </p>
        </p>
      </li>
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          What information do I need to supply for an energy rating to be
          completed??
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            The information required to complete a full and comprehensive energy
            report are the following final working drawings: Site Plan, Floor
            Plan, Elevations, Sections, Lighting layout and window schedule
            (including sizes of the existing windows).
          </p>
        </p>
      </li>
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          Does building an extension need an energy rating?
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            Depended on the size of the extension you are building there is a
            chance that it too will need to be energy rated. It&#x27;s always
            best to check first before going ahead with construction.
          </p>
        </p>
      </li>
      <li class="w-1/2 px-2 mb-2">
        <p class="text-lg font-medium leading-6 text-gray-900">
          What is the general cost of an energy rating?
        </p>
        <p class="mt-2">
          <p class="text-base leading-6 text-gray-500">
            Depended on the size of the extension you are building there is a
            chance that it too will need to be energy rated. It&#x27;s always
            best to check first before going ahead with construction.
          </p>
        </p>
      </li>
    </ul>
  </div>);
}
