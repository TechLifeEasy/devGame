import {React,useState,useEffect} from "react";
import User from "../helper/UserPop";
import {getMatches,getRating,incMatches} from '../../Api/Api'
export default function Profile() {
  const [name,setName]=useState();
  const [rating,setRating]=useState();
  const [matches,setMatches]=useState();

  useEffect(() => {
    let user=JSON.parse(window.localStorage.getItem("info"));
      const email=user.email;
      console.log(user.name);
       setName(user.name);

      getMatches({email}).then((resp)=>{
        console.log(resp);
         setMatches(resp.data.matches);
      }).catch((e)=>console.log(e))

      getRating({email}).then((resp)=>{
        setRating(resp.data.rating)
      }).catch((e)=>console.log(e))
  },[])
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h1 className="text-3xl transform text-yellow-500 translate-y-0 hover:translate-y-2 duration-500 ease-in-out uppercase font-black flex gap-2 items-center justify-center ">
          {name}
        </h1>
      </div>

      <div className="flex w-3/4 m-auto gap-3 my-10">
        <User></User>

        <div className="flex-2 w-full flex  items-center justify-center gap-2">
          <StatePop title={'Rating'} total={rating}></StatePop>
          <StatePop title={'Match Played'} total={matches}></StatePop>
          
        </div>
      </div>
    </div>
  );
}

function StatePop({ title, total }) {
  return (
    <div className="border-yellow-500 flex-1  h-full items-center flex text-2xl  flex-col rounded-xl gap-12 hover:text-yellow-500 border-2 hover:border-yellow-500 hover:translate-y-2 duration-500 ease-in-out cursor-pointer">
      <div className=" py-4 px-4 border-b-2 border-yellow-500" >{title}</div>

      <div>{total}</div>
    </div>
  );
}
