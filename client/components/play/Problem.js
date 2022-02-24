import {React,useState} from "react";
import EditorCode2 from "./code/Editor";
const brcypt = require("bcryptjs");
import { useReducer, useEffect } from "react";
import { getQuiz } from "../../Api/Api";

const data = {
  title: "193. Valid Phone Numbers",
  problem:
    "Given a text file file.txt that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers. \n You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)\n You may also assume each line in the text file must not contain leading or trailing white spaces.",
  ans: "",
};

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
  // console.log("state in",state);
  switch (action.type) {
    case "ans":
      return {
        ...state,
        ans: { ...state.ans, [action.key]: !state.ans[action.key] },
      };
    case "reset":
      return {
        ...state,
        ans:init
      }
    default:
      throw new Error("Invalid");
  }
}

export { init, reducer };

export default function Editor({socket, question }) {
  return (
    <div className="w-2/4 flex-2 py-4 overflow-auto h-full p-4">
      <Problem socket={socket} question={question}></Problem>
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

function Problem({socket, question }) {
  const [state, dispatch] = useReducer(reducer, init);
  const [chance, setChance] = useState(3)
  const [currque,setQue]=useState();
  useEffect(() => {
    getNewQue()
    setQue(question);
  }, [])

  socket.on("new_question",(que,room_id)=>{
    if(window.localStorage.getItem("room_id")!==room_id)
    return;
    console.log("Inside Client que");
    setQue(que);
  })
  
  async function CheckAns(){
    console.log(currque);
    const data=state.ans;

    for(let key in data){
      // console.log(data[key])
      data[key]=data[key]?"true":"false";
    }
    // console.log(JSON.stringify(data)==JSON.stringify(question.correct_answers2))
    // console.log(JSON.stringify(data))
    // console.log(JSON.stringify(question.correct_answers2))
    
    const ans=await brcypt.compare(JSON.stringify(data),currque.correct_answers);
    if(ans){
        setChance(3);
        // dispatch({ type: "reset", key: init })
        console.log(state);
        getNewQue();
    }else{
      setChance(chance-1)
      if(chance==0){
        setChance(3)    
        alert("You've used all your chances\n Get Ready For New Question")
         getNewQue();
        //  dispatch({ type: "reset", key: init })
         console.log(state);
      }
    }
    // if(ans){
      alert(ans);


    // }
  }

  const getNewQue=async()=>{
      try {
        getQuiz()
        .then((que)=>{
          console.log(que);
          setQue(que.data)
          socket.emit("change_que",(que.data),window.localStorage.getItem("room_id"));
        })
        .catch((e)=>{
            console.log(e);
        })
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="flex flex-col gap-10 mb-10">
      <h1 className="text-2xl text-center">{data.title}</h1>

      <div className="text-xl my-2 ">Chance Remains : {chance}</div>

      {currque && (
        <>
          <div className="">
            <h1 className="text-xl my-2 ">Problem :-</h1>

            <div className="flex flex-col gap-4">
              {currque.question.split("\n").map((data) => {
                return <div>{data}</div>;
              })}
            </div>
            {currque.description && (
              <>
                <h1 className="text-xl my-2 ">Description :-</h1>

                <div className="flex flex-col gap-4">
                  {currque.description.split("\n").map((data) => {
                    return <div>{data}</div>;
                  })}
                </div>
              </>
            )}
          </div>

          <h1 className="text-xl my-2 ">Options :-</h1>

          {currque.answers.answer_a && (
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
                  {currque.answers.answer_a}
                </span>
              </label>
            </>
          )}
          {currque.answers.answer_b && (
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
                  {currque.answers.answer_b}
                </span>
              </label>
            </>
          )}
          {currque.answers.answer_c && (
            <>
              <label class="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="answer_a_correct"
                  class="form-tick  cursor-pointer appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_c_correct"})
                  }
                />
                <span class=" dark:text-white font-normal h-30 overflow-auto ">
                  {currque.answers.answer_c}
                </span>
              </label>
            </>
          )}
          {currque.answers.answer_d && (
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
                  {currque.answers.answer_d}
                </span>
              </label>
            </>
          )}
          {currque.answers.answer_e && (
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
                  {currque.answers.answer_e}
                </span>
              </label>
            </>
          )}
          {currque.answers.answer_f && (
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
                  {currque.answers.answer_f}
                </span>
              </label>
            </>
          )}

          <div class="col-span-2 text-right">
            <button
              type="submit"
              class="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2 "
              onClick={()=>CheckAns()}>
              Let's Check
            </button>
          </div>
        </>
      )}
    </div>
  );
}
