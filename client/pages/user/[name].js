import React from "react";
import Footer from "../../components/helper/Footer";
import Profile from "../../components/user/Profile";
import Navbar from "../../components/helper/Navbar";

export default function User() {
  return (
    <>
      <Navbar></Navbar>
      <Profile></Profile>
      <Footer></Footer>
    </>
  );
}
