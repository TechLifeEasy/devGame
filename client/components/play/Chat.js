import {React,useState} from "react";
import { AiOutlineSend } from "react-icons/ai";


export default function Chat(props) {
  const [msg, setMsg] = useState("");
  const [list,setList] =useState([])
  props.socket.on('message_other',(data)=>{
    if(window.localStorage.getItem("room_id")!==data.room_id)
    return;
    console.log("mailu k nai");
    setList([...list,{name:data.name,message:data.message}])
  })
  const sendMsg=()=>{
    let user=window.localStorage.getItem('info');
    user=JSON.parse(user)
    setList([...list,{name:"You",message:msg}])
    let room_id=window.localStorage.getItem("room_id");
    // console.log(user);
    props.socket.emit("mess",({name:user.name,message:msg,room_id:room_id}));
    setMsg("")
  }
  return (
    <div className="w-1/4 flex-1 h-full flex flex-col  border-l-2 border-yellow-500">
      <h1 className="text-2xl transform text-yellow-500 translate-y-0 hover:translate-y-2 duration-500 ease-in-out uppercase font-black flex gap-2 items-center justify-center ">
        Chat Box
      </h1>

      {/* <Chats></Chats>*/}
      <div className="flex-2 h-full p-5 overflow-auto">

      
      {list.map((data)=>{
        return(<ChatPop user={data.name} text={data.message}></ChatPop>)
      })}
      </div>

      <div class="flex relative ">
        <input
          type="text"
          value={msg}
          onChange={(e)=>{setMsg(e.target.value)}}
          class="flex-1 appearance-none border border-yellow-500 w-full py-2 px-4 bg-black shadow-sm text-base focus:outline-none  placeholder:text-white"
          placeholder="Message"
        />
       <button onClick={sendMsg}><span class="inline-flex  items-center  border border-yellow-500 px-3 py-3  shadow-sm text-sm hover:bg-yellow-400  cursor-pointer hover:text-black">
          <AiOutlineSend></AiOutlineSend>
        </span></button>
      </div>
    </div>
  );
}

function Chats() {
  return (
    <div className="flex-2 h-full p-5 overflow-auto">
      <ChatPop user="zeel" text="zeel is best"></ChatPop>
      <ChatPop user="kp" text="zeel is not best"></ChatPop>
      

    </div>
  );
}

function ChatPop({ user, text }) {
  return (
    <div className="flex flex-col  p-2">
      <span className="text-yellow-500">{user} -</span>
      <span>{text}</span>
    </div>
  );
}
