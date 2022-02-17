import Navbar from "../components/helper/Navbar";
import Footer from "../components/helper/Footer";
import Dash from "../components/home/Dashboard";
import { useEffect, useState } from "react";
export default function Home() {
  const [auth,setAuth]=useState(true);
  useEffect(() => {
    if (window.localStorage.getItem("info")!==null) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  })
  
  return (
    <>
      <Navbar setAuth></Navbar>
      <Dash></Dash>
      <Footer></Footer>
    </>
  );
}
