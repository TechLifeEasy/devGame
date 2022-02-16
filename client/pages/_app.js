import "../styles/globals.css";
import Pop from '../components/helper/Pop'
import {useState} from 'react';
import Load from "../components/helper/Load";

function MyApp({ Component, pageProps }) {

 
  const [popText,setPop]=useState(false);
  const [isLoad,setLoad]=useState(false);

  
  return (
    <div className="bg-black text-white">
     
      <Component {...pageProps} />

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
