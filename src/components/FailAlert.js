import React from "react";
import error_icon from '../assets/img/error.png';
import happy_plant from '../assets/img/growth.png';
class FailAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state =
        {
            msg: "",
            img:""
        }
        this.goBack = this.goBack.bind(this)
     
    }

   
   goBack()
    {
        this.props.goBack();
    }



    render() {

        if(this.props.type=="positive")
        {
            return(<div className="alert-container">
            <img src={happy_plant} className="alert-error-icon"/>
            <h1>
              {this.props.msgBody}
            </h1>
            <button className="btn-try-again" onClick={this.goBack}> Try again</button>
        </div>)
        }

        else
        {
        return (
            <div className="alert-container">
                <img src={error_icon} className="alert-error-icon"/>
                <h1>
                  {this.props.msgBody}
                </h1>
                <button className="btn-try-again" onClick={this.goBack}> Try again</button>
            </div>
        )
    }
}



}


export default FailAlert;