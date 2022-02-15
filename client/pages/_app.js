import "../styles/globals.css";
import Pop from '../components/helper/Pop'
import {useState} from 'react';

function MyApp({ Component, pageProps }) {

 
  const [popText,setPop]=useState(false);

  
  return (
    <div>
     
      <Component {...pageProps} />

      {

       popText
       && 
        <Pop text={popText} setPop={setPop}></Pop>
      }
    </div>
  );
}

export default MyApp;
