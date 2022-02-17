import PreMatch from "../components/play/PreMatch";
import Index from "../components/play/Index";
import { useEffect, useState } from "react";

export default function Home() {
  const [isFind, setIsFInd] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFInd(false);
    }, 5000);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      {isFind ? <PreMatch></PreMatch> : <Index></Index>}
    </div>
  );
}
