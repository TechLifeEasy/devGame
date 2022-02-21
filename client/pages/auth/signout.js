import {React,useEffect} from "react";

export default function Signout() {
    useEffect(() => {
      window.localStorage.removeItem("info");
      window.location.href='/'
    }, )
    return(<></>)
}