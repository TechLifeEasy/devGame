import React from "react";
import EditorCode2 from "./code/Editor";
const data = {
  title: "193. Valid Phone Numbers",
  problem:
    "Given a text file file.txt that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers. \n You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)\n You may also assume each line in the text file must not contain leading or trailing white spaces.",
  example:
    "Assume that file.txt has the following content:\n987-123-4567\n123 456 7890\n(123) 456-7890\nYour script should output the following valid phone numbers:\n987-123-4567\n(123) 456-7890",
};

export default function Editor() {
  return (
    <div className="w-2/4 flex-2 py-4 overflow-auto h-full p-4">
      <Problem></Problem>
      <EditorCode></EditorCode>
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

      <div className="">
        <h1 className="text-xl my-2 ">Problem :-</h1>

        <div className="flex flex-col gap-4">
          {data.problem.split("\n").map((data) => {
            return <div>{data}</div>;
          })}
        </div>
      </div>
      <div className="">
        <h1 className="text-xl my-2 ">Example :-</h1>

        <div className="flex flex-col gap-4">
          {data.example.split("\n").map((data) => {
            return <div>{data}</div>;
          })}
        </div>
      </div>
    </div>
  );
}



