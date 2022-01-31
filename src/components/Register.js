import React from "react";
import axios from "axios";
import Plant_Logo from "../assets/img/plant_hand.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            contact: "",
            email: "",
            password: "",
            confirm_password: "",
            apiEndPoint: process.env.REACT_APP_API_ROOT+"/regUser.php"
        }
        this.handleData = this.handleData.bind(this);
        this.handleReg = this.handleReg.bind(this);
        this.loadLoginView = this.loadLoginView.bind(this);
    }

     makeToken(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }


    handleData(event) {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(this.state.name)

    }

    handleReg(event) {
        event.preventDefault();
        if (this.state.password === this.state.confirm_password && this.state.password!="") {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (regex.test(this.state.email) == true) {
                let formData = new FormData();
                formData.append("name", this.state.name);
                formData.append("email", this.state.email);
                formData.append("contact", this.state.contact);
                formData.append("password", this.state.password);
                formData.append("token", this.makeToken(25));
                const url = this.state.apiEndPoint;
                axios.post(url, formData)
                    .then(res => this.onRegitration(res))
                    .catch(err => console.log(err));


            }
            else {
               // alert("Invalid Email")
                toast.error("Invalid Email")
            }

        }
        else {
         //   alert("Password mismatch")
            toast.error("Password Mismatch")
        }




    }

    onRegitration(res) {
     //   alert(res.data)
     console.log(res.data)
        if(res.data==1)
        {
            this.loadLoginView()
        }
        else
        {
            alert("Error")
            toast.error("User already exists. Please try again with a different email")
        }
    }

    loadLoginView()
    {
        this.props.loadLoginView();
    }





    render() {
        return (
            <div className="loader-container bg-dark-green" style={{ height: "100vh" }}  data-aos="fade-right">
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
                <div className="login-container" >
                    {/*} <div className="flex-center">
                    <img src={Plant_Logo} className="plant-hand-logo mt-2" />
                    </div> {**/}
                    <div className="full-column">
                        <h1 className="login-head-text">Register with <br /> Dr.Plant</h1>
                        <div className="full-column text-input-container">
                            <input value={this.state.name} onChange={this.handleData} name="name" id="name" type="text" className="text-input" placeholder="Name" />
                            <input value={this.state.email} onChange={this.handleData} name="email" id="email" type="email" className="text-input" placeholder="Email" />
                            <input value={this.state.contact} onChange={this.handleData} name="contact" id="contact" type="text" className="text-input" placeholder="Contact No" />
                            <input value={this.state.password} onChange={this.handleData} name="password" id="password" type="password" className="text-input" placeholder="Password" />
                            <input value={this.state.confirm_password} onChange={this.handleData} name="confirm_password" id="confirm_password" type="password" className="text-input" placeholder="Confirm Password" />
                            <>
                                <button className="btn-yellow" onClick={this.handleReg}>Register</button>
                                <p className="text-help-info">Already have an account?</p>
                                <button className="btn-lgreen " onClick={this.loadLoginView}>Login</button>

                            </>

                        </div>



                    </div>

                </div>


            </div>
        )
    }
}

export default Register;