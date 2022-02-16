import React from "react";
import EditorCode2 from "./code/Editor";
const data = {
  title: "193. Valid Phone Numbers",
  problem:
    "Given a text file file.txt that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers. \n You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)\n You may also assume each line in the text file must not contain leading or trailing white spaces.",
  ans: "",
};

export default function Editor() {
  return (
    <div className="w-2/4 flex-2 py-4 overflow-auto h-full p-4">
      <Problem></Problem>
      {/* <EditorCode></EditorCode> */}
    </div>
  );
}

function EditorCode() {
  return (
    <div>
      <h1 className="text-xl my-2 ">Code :-</h1>
      <EditorCode2 />
    </div>
  );
}

function Problem() {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <h1 className="text-2xl text-center">{data.title}</h1>

      <div className="text-xl my-2 ">
        Chance Remains : 3
      </div>

      <div className="">
        <h1 className="text-xl my-2 ">Problem :-</h1>

        <div className="flex flex-col gap-4">
          {data.problem.split("\n").map((data) => {
            return <div>{data}</div>;
          })}
        </div>
      </div>
      <div className="">
        <h1 className="text-xl my-2 ">Ans :-</h1>

        <div class="col-span-2">
          <label class="text-gray-700" for="name">
            <textarea
              class="flex-1 appearance-none outline-none bg-black border-yellow-500 border-2 w-full py-2 px-4 text-white placeholder-gray-400 "
            
              placeholder="Enter your ans"
              name="comment"
              rows="5"
              cols="40"
            ></textarea>
          </label>
        </div>
        <div class="col-span-2 text-right">
          <button
            type="submit"
            class="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2 "

           
          >
            Let's Check
          </button>
        </div>
      </div>
    </div>
  );
}
