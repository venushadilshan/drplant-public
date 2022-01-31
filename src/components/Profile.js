import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import FarmerIcon from '../assets/img/farmer.png';
import back_icon from '../assets/img/back.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Profile extends React.Component {
    constructor(props) {
        super()
        this.state = {

        }
        this.goBack = this.goBack.bind(this)
        this.logOut = this.logOut.bind(this);
    }
    goBack()
    {
        this.props.goBack()
    }

    componentDidMount()
    {
        AOS.init();
    }

    logOut()
    {
        localStorage.clear()
       this.props.loadLogView();
       toast("Logged Out")
    }




    render() {
        return (
            <div className="bg-dark-green" data-aos="fade-right">
                <div className="app-header">

                    <img src={back_icon} className="btn-back" onClick={this.goBack}></img>
                    <p className="label-back" onClick={this.goBack}>Back</p>

                </div>
                <div className="profile-container">


                    <div className="profile-content ">
                        <p className="page-label" style={{ alignSelf: "center" }}>My Profile </p>
                        <img src={FarmerIcon} className="icon-profile" />
                        <p><span>User ID:</span> {localStorage.getItem("currentUserID")} </p>
                        <p><span>Email:</span> {localStorage.getItem("currentUser")} </p>
                        <p><span>Name: </span>{localStorage.getItem("currentUserName")} </p>
                        <p><span>Phone:</span> {localStorage.getItem("currentUserPhone")} </p>
                        <button className="btn-lgreen" onClick={this.logOut}> Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;