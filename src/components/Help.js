import React from 'react';
import PlantIcon from '../assets/img/plant.svg';
import help_icon from '../assets/img/guide.gif'
import iconN1 from '../assets/img/icon_n1.svg';
import iconN2 from '../assets/img/icon_n2.svg';
import iconN3 from '../assets/img/icon_n3.svg';
class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "",
            dataSet: []
        }
    }


    render() {
        return (
            <div className="loader-container bg-dark-green" >
                <div className="help-container">
                <img className="plant-logo" src={help_icon} alt="Plant Logo"></img>
                <div className="help-content">
                    <div className="all-center">
                        
                        <h1 className="text-help-subhead">How this Works?</h1>
                    </div>
                    <div className="all-center">
                        <img src={iconN1} className="help-icon-number"/>
                        <h1 className="text-help-info">Take or select photo of the infected area of the plant</h1>
                    </div>

                    <div className="all-center">
                        <img src={iconN2} className="help-icon-number"/>
                        <h1 className="text-help-info">Upload the photo</h1>
                    </div>

                    <div className="all-center">
                        <img src={iconN3} className="help-icon-number"/>
                        <h1 className="text-help-info">Check for disease</h1>
                    </div>

                    <button className="btn-yellow mobile-btn" style={{alignSelf:"center"}}> Next</button>

                    </div>

                </div>

            </div>

        )
    }
}

export default Help;