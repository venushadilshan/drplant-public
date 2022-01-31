import React from "react";
import LoadingIcon from '../assets/img/loader.gif';


class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }


    render() {
        return (
            <div className="loader-container">
                <img src={LoadingIcon} className="loading-icon"/>
                <p style={{textAlign:"center", margin:"10px"}}> Processing...<br/><br/> Please wait. This may take some time.</p></div>
        )
    }


}

export default Loader;