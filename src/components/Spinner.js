import React from "react";
import LoadingIcon from "../assets/img/loading.gif";

class Spinner extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={}
    }



    render()
    {
        return (
            <div className="loader-container" style={{backgroundColor:"transparent", position:"absolute"}}>
                  <img src={LoadingIcon} className="loading-icon"/>
                </div>
        )
    }
}

export default Spinner;