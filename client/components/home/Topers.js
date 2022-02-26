import {React,useEffect,useState} from "react";
import User from "../helper/UserPop";
import {getAll} from '../../Api/Api'
import { getUrl } from "../helper/find";

export default function Topers(){
  const [data, setdata] = useState([]);
  const [top3,setTop3]=useState([]);
  const [all,setAll] =useState(false);
  const [userAvt, setUrl] = useState(getUrl());
  useEffect(() => {
    getAll().then((dt)=>{
      let newData=[]
      if (dt.data.length>3) {
        newData=dt.data.slice(0,3);
      }else{
        newData=dt.data;
      }
      setdata(dt.data);
      setTop3(newData);
      console.log(data);
    }).catch((e)=>{console.log(e);})
  },[])
  
  return (
    <div
      className="
      flex flex-col items-center justify-center h-full
      gap-4
      lg:w-3/4
      w-full
      text-white">
      {/* <h1 className="  text-2xl">Dev Game</h1> */}

      <h1 className="mb-4  text-2xl">Today Top Players</h1>
    
     <div class=" flex  gap-6 mx-auto w-full items-center justify-center dark:bg-gray-800 rounded-lg shadow">
      
      {(all?data:top3).map((dt)=>{
        return(
      <UserOne name={dt.name} rating={dt.rating}></UserOne>)
      })}
     </div>

      <button
        className="border-x-2 border-yellow-500 py-3 w-full  overflow-hidden transform translate-y-0 hover:bg-yellow-500 hover:text-black duration-200 ease-in-out
      bg-black text-yellow-500" onClick={()=>{setAll(!all)}} >
        {all?<p>All</p>:<p>Top 3</p>}
      </button>
    </div>
  );
}

// function DayTopers() {
//   return (
//     <div class=" flex  gap-6 mx-auto w-full items-center justify-center  dark:bg-gray-800 rounded-lg shadow">
//       {data.map((dt)=>{
//       <UserOne name={dt.name} rating={dt.rating}></UserOne>
//       })}
//     </div>
//   );
// }

function UserOne({name,rating}){
  return (
    <div class=" relative shadow-lg rounded-2xl w-64  text-black  dark:bg-gray-800 p-4 bg-black hover:text-yellow-500 border-2 hover:border-yellow-500 hover:translate-y-2 duration-500 ease-in-out cursor-pointer">
      
        <>
          <img
            alt="profil"
            src="https://images.unsplash.com/photo-1581147543324-6a0a08a48ce5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            class="rounded-t-lg h-28 w-full mb-4"
          />
          <div class="flex flex-col items-center justify-center p-4 -mt-16">
            <a class="block relative">
              <img
                alt="profil"
                src={user}
                class="mx-auto object-cover rounded-full h-16 w-16 "
              />
            </a>
            <p class=" text-xl font-medium mt-2 text-yellow-500">{name}</p>
            <p class=" text-xl font-medium mt-2 text-yellow-500">{rating}</p>
          </div>
        </>
      
    </div>

  )
}
