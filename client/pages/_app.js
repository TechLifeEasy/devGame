import "../styles/globals.css";
import Pop from '../components/helper/Pop'
import {useState,useEffect} from 'react';
import Load from "../components/helper/Load";





function MyApp({ Component, pageProps }) {
  
  
  const [popText,setPop]=useState(false);
  const [isLoad,setLoad]=useState(false);

  const handle={
    popText:popText,
    isLoad:isLoad,
    setLoad:setLoad,
    setPop:setPop
  }
  
  
  return (
    <div className="bg-black text-white">
     
      <Component {...pageProps} {...handle} />

      {

       popText
       && 
        <Pop text={popText} setPop={setPop}></Pop>
      }
      {

       isLoad
       && 
        <Load></Load>
      }
    </div>
  );
}

export default MyApp;
