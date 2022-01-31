import React from "react";
import back_icon from '../assets/img/back.png';
import help_icon from '../assets/img/help.png';
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Consult extends React.Component {
    line0 = "\nI am ";
    line1 = "Hello sir/madam,"
    line2 = "and I have the"
    line3 = "on my plant name plants. I would like to get more consultations regarding this matter from your organization. \nThank you. \n\nAdd more details that you think important for the consultation company."

    constructor(props) {
        super(props)
        this.state = {

            textareaData: "",
            issue: "Hello sir/madam, \nI am" + " " + this.props.cardData.userName + " " + "and I have the " +
                this.props.cardData.diseaseName + " " + "on my plant. I would like to get more consultations regarding this matter from your organization. \nThank you. \n\n--Add more details that you think important for the consultation company.",
            apiEndPoint: process.env.REACT_APP_API_ROOT+"/submitConsult.php",
            companyEmail:this.props.cardData.companyEmail
        }

        this.handleData = this.handleData.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onSubmitSucess = this.onSubmitSucess.bind(this)
        this.goBack = this.goBack.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
        this.sendEmail = this.sendEmail.bind(this);
    }

    handleData(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.issue)

    }
    componentDidMount()
    {
        console.log(this.state.companyEmail)
    }


    handleSubmit(event) {
        this.sendEmail()

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        let formData = new FormData();
        formData.append("issue", this.state.issue);
        formData.append("userID", this.props.cardData.userID);
        formData.append("companyID", this.props.cardData.companyID);
        formData.append("date", date);


        const url = this.state.apiEndPoint;
        axios.post(url, formData)
            .then(res => this.onSubmitSucess(res))
     
            .catch(err => console.log(err));


            this.goBack();
    }

    sendEmail() {
        let formData = new FormData();
        formData.append("email","venusha125@gmail.com")
        formData.append("userName",localStorage.getItem("currentUser"))
        formData.append("plantName",this.props.cardData.plant)
        formData.append("diseaseName",this.props.cardData.diseaseName)
        formData.append("notes",this.state.issue)

        const url = process.env.REACT_APP_API_ROOT+"/email.php";
        axios.post(url,formData)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
    }

    onSubmitSucess(res) {
        if (res.data === 1) {
           // alert("Submitted")
            toast.success("Request Submitted ")
        }

        else {
            alert("Error")
            toast.error("Something went wrong")
        }

    }

    goBack() {
        this.props.goBack()
    }



    render() {

        return (

            <div className="bg-dark-green " style={{minHeight:"100vh"}}>
        <ToastContainer
           position="bottom-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover

        />
                <div className="app-header">

                    <img src={back_icon} className="btn-back" onClick={this.goBack}></img>
                    <p className="label-back" onClick={this.goBack}>Home</p>

                </div>

                <div className="center-content">
                    <div className="consult-container ">


                        <img src={help_icon} className=" mt-2 icon-consult" />



                        <div className=" input-center" >
                            <p className="page-label" >Consultation Details </p>
                            <p className="text-consult-info mb-2">
                                <br />Disease Name: <strong>{this.props.cardData.diseaseName} </strong>
                                <br />Plant: <strong>{this.props.cardData.plant} </strong>
                                <br />Company Name: <strong>{this.props.cardData.companyName} </strong> <br />   </p>

                            <textarea type="text" cols="1" rows="10" id="issue" onChange={this.handleData} name="issue" value={this.state.issue} placeholder="Add more details that you think important for the consultation company.">

                            </textarea>

                            <button className="btn-lgreen" style={{ margin: "20px" }} onClick={this.handleSubmit}>Submit</button>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default Consult;