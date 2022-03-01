import { React, useState } from "react";
import EditorCode2 from "./code/Editor";
const brcypt = require("bcryptjs");
import { useReducer, useEffect } from "react";
import { getQuiz, updateRating } from "../../Api/Api";
const jwt = require("jsonwebtoken");
// import mongoose from 'mongoose';

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

export default function Editor({ socket, question, dataPartner }) {
  return (
    <div className="w-2/4 flex-2 py-4 overflow-auto h-full p-4">
      <Problem
        socket={socket}
        question={question}
        dataPartner={dataPartner}
      ></Problem>
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

function Problem({ socket, question, dataPartner }) {
  const [state, dispatch] = useReducer(reducer, init);
  const [chance, setChance] = useState(3);
  const [currque, setQue] = useState(question);
  const [me, setMe] = useState(
    JSON.parse(window.localStorage.getItem("info")).name
  );
  const [pop, setPop] = useState({ text: "", show: false });

  useEffect(() => {
    // setQue(question);
    // getNewQue();
    initSocket();
  }, []);
  useEffect(() => {
    setQue(question);
    // getNewQue();
    // initSocket();
  }, [question]);

  function reducer(state, action) {
    switch (action.type) {
      case "ans":
        const newAns = { ...state.ans, [action.key]: !state.ans[action.key] };
        socket.emit("AnsChange", {
          data: newAns,
          room_id: window.localStorage.getItem("room_id"),
        });
        return {
          ...state,
          ans: newAns,
        };
      case "ansSo":
        //console.log(state.ans)
        //console.log(action.data)
        return {
          ...state,
          ans: action.data,
        };
      case "reset":
        return {
          ...state,
          ans: init,
        };
      default:
        throw new Error("Invalid");
    }
  }

  const update = async (rating) => {
    console.log("update my output");
    let email = JSON.parse(window.localStorage.getItem("info")).email;
    //console.log(email);
    // alert("solve the question nice");
    setPop({
      text: "solve the question nice",
      show: true,
      cb: () => {
        updateRating({ email, rating })
          .then((resp) => {
            // alert("solve the question nice");
            //console.log(resp);
          })
          .catch((e) => console.log(e));
        updateRating({ email:dataPartner.email, rating })
          .then((resp) => {
            // alert("solve the question nice");
            //console.log(resp);
          })
          .catch((e) => console.log(e));
          window.location.href='/'
      },
    });
  };
  function initSocket() {
    socket.on("new_question", (que, room_id) => {
      if (window.localStorage.getItem("room_id") !== room_id) return;
      //console.log("Inside Client que");
      setQue(que);
    });
    socket.on("changeAns", (data) => {
      //console.log("change ans");
      dispatch({ type: "ansSo", data: data.data });
    });

    socket.on("new_chance", (room_id, num) => {
      // if (window.localStorage.getItem("room_id") != room_id) return;
      setChance(num);
    });

    socket.on("new_rating", (data) => {
      //console.log("Third:",data.room_id);
      // if (window.localStorage.getItem("room_id") !== data.room_id) return;
      //console.log("Fourth");
      update(data.rating);
      //console.log("Hello Dhruvil");
    });

    // socket.on("didd");

    socket.on("left", (data) => {
      window.location.href = "/";
    });

    socket.on("WantSub", (data) => {
      if (data.id != me) {
        setPop({
          text: "What to sub Ans",
          show: true,
          cb: () => {
            socket.emit("NoSub", data);
          },
          cbn: () => {
            socket.emit("YesSub", data);
          },
        });
      }
    });

    socket.on("disconnect", () => {
      left();
    });

    socket.on("user-net-gaya", (data) => {
      if (data.id == dataPartner.socket_id) {
        // alert('patens left')
        setPop({
          text: "Onther User left Back to Home",
          show: true,
          cb: () => {
            window.location.href = "/";
          },
        });
      }
    });
  }

  function getRating(diff) {
    switch (diff) {
      case "easy":
        return 10;
      case "medium":
        return 20;
      case "hard":
        return 30;
      default:
        return 10;
    }
  }

  const setSocketChance = (num) => {
    const room_id = window.localStorage.getItem("room_id");
    socket.emit("change_chance", room_id, num);
  };

  const setSocketRating = (rating) => {
    const room_id = window.localStorage.getItem("room_id");
    //console.log("First",room_id);
    socket.emit("change_rating", { room_id, rating });
  };

  function left() {
    const room_id = window.localStorage.getItem("room_id");
    socket.emit("left-room", { room_id: room_id });
  }

  function issame(d1, d2) {
    for (let key in d1) {
      console.log(`<h1>${d1[key] + " " + d2[key]}</h1>`);
      if (d1[key] != d2[key]) return false;
    }
    return true;
  }
  async function CheckAns() {
    //console.log(currque);

    const room_id = window.localStorage.getItem("room_id");
    socket.emit("SubAns", { room_id: room_id, id: me });

    socket.on("NotCheck", () => {
      setPop({
        text: `User Don't What to Sub`,
        show: true,
        cb: () => {},
      });
    });

    socket.on("LetCheck", (data) => {
      if (data.id == me) {
        const data = { ...state.ans };
        for (let key in data) {
          data[key] = data[key] ? "true" : "false";
        }

        const ans_ac = jwt.verify(
          currque.correct_answers,
          process.env.NEXT_PUBLIC_S
        );
        console.log(ans_ac);
        console.log(data);
        if (issame(ans_ac, data)) {
          console.log("same");
          let rating = getRating(currque.difficulty);
          setSocketRating(rating);
          let info = JSON.parse(window.localStorage.getItem("info"));
          // updateRating({ email: info.email, rating })
          //   .then((resp) => {
          //console.log(resp);
          // alert("solve the question nice");
          setPop({
            text: "solve the question nice",
            show: true,
            cb: () => {
              const room_id = window.localStorage.getItem("room_id");
              socket.emit("left-room", { room_id: room_id });
              window.location.href = "/";
            },
          });
          // })
          // .catch((e) => console.log(e));
          // // dispatch({ type: "reset", key: init })
        } else {
          setChance(chance - 1);
          setSocketChance(chance - 1);
          if (chance - 1 == 0) {
            // alert("You've used all your chances\n better luck next time");
            setPop({
              text: "You've used all your chances\n better luck next time",
              show: true,
              cb: () => {
                const room_id = window.localStorage.getItem("room_id");
                socket.emit("left-room", { room_id: room_id });
                window.location.href = "/";
                setChance(3);
                setSocketChance(3);
              },
            });
            // getNewQue();

            //  dispatch({ type: "reset", key: init })
            //console.log(state);
          } else {
            // alert(`${chance-1} move remains`)
            setPop({
              text: `${chance - 1} move remains`,
              show: true,
              cb: () => {},
            });
          }
        }
      }
    });

    // if(ans){
    // alert(ans_ac);

    // }
  }
  const getNewQue = async () => {
    try {
      socket.emit("AnsChange", {
        data: init.ans,
        room_id: window.localStorage.getItem("room_id"),
      });
      getQuiz()
        .then((que) => {
          //console.log(que);
          setQue(que.data);
          socket.emit(
            "change_que",
            que.data,
            window.localStorage.getItem("room_id")
          );
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-10 mb-10">
      <h1 className="text-2xl text-center">{data.title}</h1>
      {pop.show && <Pop {...pop} setPop={setPop}></Pop>}

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
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_a_correct" })
                  }
                  checked={state.ans.answer_a_correct ? "on" : ""}
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
                  name="answer_b_correct"
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_b_correct" })
                  }
                  checked={state.ans.answer_b_correct ? "on" : ""}
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
                  name="answer_c_correct"
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_c_correct" })
                  }
                  checked={state.ans.answer_c_correct ? "on" : ""}
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
                  name="answer_d_correct"
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_d_correct" })
                  }
                  checked={state.ans.answer_d_correct ? "on" : ""}
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
                  name="answer_e_correct"
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_e_correct" })
                  }
                  checked={state.ans.answer_e_correct ? "on" : ""}
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
                  name="answer_f_correct"
                  class="cursor-pointer bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                  onClick={() =>
                    dispatch({ type: "ans", key: "answer_f_correct" })
                  }
                  checked={state.ans.answer_f_correct ? "on" : ""}
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
              onClick={() => CheckAns()}
            >
              Let's Check
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function Pop({ text, setPop, cb, cbn }) {
  return (
    <div className="fixed v_center z-100 gap-3 bg-black m-auto">
      <div className="text-xl capitalize"> {text} </div>

      <button
        class="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2 "
        onClick={() => {
          setPop({ text: "", show: false });
          cb();
        }}
      >
        Ok
      </button>
      {cbn && (
        <button
          class="py-2 px-4  bg-black hover:bg-yellow-400  hover:text-black   text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md     border-yellow-500 border-x-2 "
          onClick={() => {
            setPop({ text: "", show: false });
            cbn();
          }}
        >
          No
        </button>
      )}
    </div>
  );
}
