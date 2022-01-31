import React from "react";
import Logo_White from "../assets/img/logo_wh_bg.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';

class Splash extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            currentView:"",
            data:[],
            
        }
        this.loadNext = this.loadNext.bind(this)
    }
  

      loadNext()
      {
          this.props.setIntroView()
      }

      componentDidMount()
      {
          localStorage.clear()
        setTimeout(function() {
            this.loadNext()
          }.bind(this), 2000);
          AOS.init();
      }

     
     
    render()
    {
        return(
            <div>
                <div className="loader-container bg-dark-green">
                    <img src={Logo_White} className="splash-logo" data-aos="zoom-in"></img>
                    <h1 className="splash-text" data-aos="zoom-in">Dr.Plant</h1>
            
                </div>
            </div>
        )
    }
}

export default Splash;