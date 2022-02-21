import React from "react";
import EditorCode2 from "./code/Editor";
const brcypt = require("bcryptjs");
const data = {
  title: "193. Valid Phone Numbers",
  problem:
    "Given a text file file.txt that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers. \n You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)\n You may also assume each line in the text file must not contain leading or trailing white spaces.",
  ans: "",
};

import { useReducer, useEffect } from "react";
import { getQuiz } from "../../Api/Api";

const init = {
  ans: {
    answer_a_correct: false,
    answer_b_correct: false,
    answer_c_correct: false,
    answer_d_correct: false,
    answer_e_correct: false,
    answer_f_correct: false,
  },
};

function reducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "ans":
      return {
        ...state,
        ans: { ...state.ans, [action.key]: !state.ans[action.key] },
      };
    default:
      throw new Error("Invalid");
  }
}

export { init, reducer };

export default function Editor({ question }) {
  return (
    <div className="w-2/4 flex-2 py-4 overflow-auto h-full p-4">
      <Problem question={question}></Problem>
      {/* <EditorCode></EditorCode> */}
    </div>
  );
}

// function EditorCode({question}) {
//   return (
//     <div>
//       <h1 className="text-xl my-2 ">Code :-</h1>
//       <EditorCode2 question={question} />
//     </div>
//   );
// }

function Problem({ question }) {
  const [state, dispatch] = useReducer(reducer, init);

  async function CheckAns(){

    const data=state.ans;

    for(let key in data){
      // console.log(data[key])
      data[key]=data[key]?"true":"false";
    }
    // console.log(JSON.stringify(data)==JSON.stringify(question.correct_answers2))
    // console.log(JSON.stringify(data))
    // console.log(JSON.stringify(question.correct_answers2))
    
    const ans=await brcypt.compare(JSON.stringify(data),question.correct_answers);

    // if(ans){
      alert(ans);
    // }
  }

  return (
    <div className="flex flex-col gap-10 mb-10">
      <h1 className="text-2xl text-center">{data.title}</h1>

      <div className="text-xl my-2 ">Chance Remains : 3</div>

      {question && (
        <>
          <div className="">
            <h1 className="text-xl my-2 ">Problem :-</h1>

            <div className="flex flex-col gap-4">
              {question.question.split("\n").map((data) => {
                return <div>{data}</div>;
              })}
            </div>
            {question.description && (
              <>
                <h1 className="text-xl my-2 ">Description :-</h1>

                <div className="flex flex-col gap-4">
                  {question.description.split("\n").map((data) => {
                    return <div>{data}</div>;
                  })}
                </div>
              </>
            )}
          </div>

          <h1 className="text-xl my-2 ">Options :-</h1>

          {question.answers.answer_a && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_a_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_a}
                </span>
              </label>
            </>
          )}
          {question.answers.answer_b && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_b_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_b}
                </span>
              </label>
            </>
          )}
          {question.answers.answer_c && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_c_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_c}
                </span>
              </label>
            </>
          )}
          {question.answers.answer_d && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_d_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_d}
                </span>
              </label>
            </>
          )}
          {question.answers.answer_e && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_e_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_e}
                </span>
              </label>
            </>
          )}
          {question.answers.answer_f && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_f_correct" })
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {question.answers.answer_f}
                </span>
              </label>
            </>
          )}

          <div class="col-span-2 text-right">
            <button
              type="submit"
              class="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2 "

              onClick={()=>CheckAns()}
            >
              Let's Check
            </button>
          </div>
        </>
      )}
    </div>
  );
}
