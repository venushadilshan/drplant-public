import React from 'react';
import Dashboard from './Dashboard';
import Loader from './Loader';
import Splash from './Splash';
import Help from './Help';
import MyComponent from './MyComponent';
import Register from './Register';
import Login from './Login';
import Result from './Result';
import FailAlert from './FailAlert';
import Spinner from './Spinner';
import Consult from './Consult';
import Intro from './Intro';
import Profile from './Profile';
import axios from "axios";
class ViewHandler extends React.Component {
    constructor(props) {
        super()
        this.state = {
            currentView: "Intro",
            userEmail: localStorage.getItem('currentUser'),
            dataArray: [],
            cardData: {}
        }
        this.loadDashboard = this.loadDashboard.bind(this);
        this.loadResultView = this.loadResultView.bind(this);
        this.loadRegView = this.loadRegView.bind(this);
        this.loadLoginView = this.loadLoginView.bind(this);
        this.loadConsultView = this.loadConsultView.bind(this);
        this.loadIntroView = this.loadIntroView.bind(this)
        this.loadProfileView = this.loadProfileView.bind(this)
        this.checkUserSession = this.checkUserSession.bind(this)
        this.next = this.next.bind(this)
     
    }

    componentDidMount()
    {
      
        this.checkUserSession()
    }

    checkUserSession()
    {
     
       
            let formData = new FormData();
           
            formData.append("email", localStorage.getItem('currentUser'));
            
            formData.append("token",localStorage.getItem('userToken'));
            const url = process.env.REACT_APP_API_ROOT+"/checkToken.php";
            axios.post(url, formData)
                .then(res => this.next(res))
                .catch(err => console.log(err));


    }

    next(res)
    {
        //console.log(res.data)
        if( res.data.token == localStorage.getItem('userToken')  && res.data.token!=undefined && res.data.token!="")
        {
           
            this.loadDashboard(localStorage.getItem('currentUser'))
            this.setState({currentView:"Dash"})
        }
        else
        {
            
            this.setState({currentView:"Spl"})
            
        }
    }

    



    loadDashboard(currentUser) {
        this.setState({ userEmail: currentUser })
        this.setState({ currentView: "Dash" })
       // console.log(this.state.userEmail)
    }
    loadResultView(dataArray) {
        this.setState({ dataArray: dataArray })
        this.setState({ currentView: "Result" })
        console.log(this.state.dataArray)
    }
    loadRegView() {
        this.setState({ currentView: "Reg" })
    }

    loadLoginView() {
        this.setState({ currentView: "Log" })
    }

    loadConsultView(cardData) {
        this.setState({ cardData: cardData })
        this.setState({ currentView: "Consult" })
        console.log(cardData)
    }
    loadIntroView()
    {
        this.setState({currentView:"Intro"})
    }
    loadProfileView()
    {
        this.setState({currentView:"Profile"})
    }


    render() {
       
        if(this.state.currentView=="Profile")
        {
            return(<Profile goBack={this.loadDashboard} loadLogView={this.loadLoginView}/>)
        }
        if (this.state.currentView == "Intro") {
            return (<Intro loadLogView={this.loadLoginView}/>)
        }
        if (this.state.currentView == "Consult") {
            return (<Consult cardData={this.state.cardData} goBack={this.loadDashboard} />)
        }

        if (this.state.currentView == "Spin") {
            return (<Spinner />)
        }
        if (this.state.currentView == "Load") {
            return (<Loader />)
        }
        if (this.state.currentView == "Fail") {
            return (<FailAlert />)
        }
        if (this.state.currentView == "Result") {
            return (<Result dataArray={this.state.dataArray} loadDashboardView={this.loadDashboard} loadConsultView={this.loadConsultView} />)
        }
        if (this.state.currentView == "Log") {
            return (<Login loadDashboard={this.loadDashboard} loadRegView={this.loadRegView} />)
        }


        if (this.state.currentView == "Reg") {
            return (<Register loadLoginView={this.loadLoginView} />)
        }

        if (this.state.currentView == "Dash") {
            return (<Dashboard currentUser={this.state.userEmail} loadResultView={this.loadResultView} loadProfileView={this.loadProfileView} />)
        }
        if (this.state.currentView == "Spl") {
            return (<Splash setIntroView={this.loadIntroView}/>)
        }
        if (this.state.currentView == "Help") {
            return (<Help />)
        }
        if (this.state.currentView == "MyC") {
            return (<MyComponent />)
        }
    }

}


export default ViewHandler;