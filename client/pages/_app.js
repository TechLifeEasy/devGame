import "../styles/globals.css";
import Pop from '../components/helper/Pop'

function MyApp({ Component, pageProps }) {
  return (
    <div>
     
      <Component {...pageProps} />

      <Pop text="zeel is best"></Pop>
    </div>
  );
}

export default MyApp;
