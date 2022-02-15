import React from "react";
import Topers from "./Topers";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div>
      <div className="w-full h-screen flex gap-3 flex-wrap items-center justify-center">
        <Image
          src="/img/top.svg"
          alt="Picture of the author"
          width={600}
          height={500}
        />

        <Topers></Topers>
      </div>
      
    </div>
  );
}
