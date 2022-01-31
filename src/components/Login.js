import React from "react";
import axios from "axios";
import Plant_Logo from "../assets/img/help.gif";
import Spinner from "./Spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            email: "",
            password: "",

            apiEndPoint: process.env.REACT_APP_API_ROOT+"/checkUser.php",
            showSpinner: 0
        }
        this.handleData = this.handleData.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.loadDashboard = this.loadDashboard.bind(this);
        this.loadRegister = this.loadRegister.bind(this);
    }



    handleData(event) {
        this.setState({ [event.target.name]: event.target.value });
        //  console.log(this.state.email)
        // console.log(this.state.password)

    }

    handleLogin(event) {
        
        event.preventDefault();

        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (regex.test(this.state.email) == true) {
            let formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("email", this.state.email);
            formData.append("contact", this.state.contact);
            formData.append("password", this.state.password);
            const url = this.state.apiEndPoint;
            axios.post(url, formData)
                .then(res => this.onLog(res))
                .catch(err => console.log(err));


        }
        else {
            toast.error("Invalid Email")


        }

    }


    onLog(res) {
        console.log(res.data.userID);
        if (res.data.userID != undefined) {
            
            toast.success("Login success, You will be redirected to the Dashboard.")
            localStorage.setItem('currentUser', this.state.email)
            localStorage.setItem('currentUserID', res.data.userID)
            localStorage.setItem('currentUserName', res.data.name)
            localStorage.setItem('currentUserPhone', res.data.telephone)
            localStorage.setItem('userToken', res.data.token)
            this.loadDashboard(this.state.email);
        }
        else {
            toast.error("Invalid credentials. Please try again")
        }
    }

    loadDashboard(currentUser) {
        this.props.loadDashboard(currentUser);
    }

    loadRegister() {
        this.props.loadRegView();
    }





    render() {
        if (this.state.showSpinner == 1) {
            return (<Spinner />)

        }
        return (

            <div>
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
                <div className="loader-container bg-dark-green" data-aos="fade-right" >


                    <div className="login-container">
                        <div className="flex-center">
                            <img src={Plant_Logo} className="plant-hand-logo mt-2" />
                        </div>
                        <div className="full-column">
                            <h1 className="login-head-text">Login with <br /> Dr.Plant</h1>
                            <form>
                                <div className="full-column text-input-container">

                                    {/* test credentials -> email-venusha@venusha.com pass-123  */}


                                    <input value={this.state.email} onChange={this.handleData} name="email" id="email" type="text" className="text-input" placeholder="Email" />

                                    <input value={this.state.password} onChange={this.handleData} name="password" id="password" type="password" className="text-input" placeholder="Password" />

                                    <button className="btn-lgreen" onClick={this.handleLogin} type="submit">Login</button>


                                    <p className="text-help-info">Don't have an account?</p>
                                    <button className="btn-yellow" onClick={this.loadRegister} >Register</button>


                                </div>

                            </form>

                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default Login;