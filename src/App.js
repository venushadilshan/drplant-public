import logo from './logo.svg';
import './App.css';
import ImgUpload from './components/ImgUpload';
import ViewHandler from './components/ViewHandler';
import { Helmet } from "react-helmet";
import Logo from "./assets/img/fav.png";
const dotenv = require('dotenv');



function App() {
  return (
    <div>
      <Helmet>
        <title>Dr.Plant</title>
        
        <link rel="icon"
          type="image/png"
          href={Logo} sizes="16x16"/>
          <meta name="description" content="Dr.Plant - Intelligent Plant Disease Detection System"></meta>

      </Helmet>
      <ViewHandler />
    </div>
  );
}

export default App;
