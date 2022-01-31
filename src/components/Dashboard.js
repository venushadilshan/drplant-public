import React from 'react';
import userIcon from '../assets/img/user.png';
import ImgUpload from './ImgUpload';
import ImgPlaceholder from '../assets/img/guide.gif';
import axios from 'axios';
import Loader from './Loader';
import FailAlert from './FailAlert';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




class Dashboard extends React.Component {
  UPLOAD_ENDPOINT = process.env.REACT_APP_API_ROOT+'/uploadImg.php';
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      returnPath: ImgPlaceholder,
      uploading: "",
      output: "",
      data: [],
      returnPlant: "",
      userPlant: "none",
      resultValid: false,
      Did: "",
      next_btn_uploadBtnVisibility: 0.3,
      btnOpacity: 0.3,
      next_btn_pointerEnabled: "none",
      probability: 0.00,
      score: 1,
      upload_btn_uploadBtnVisibility: 0.3,
      upload_btn_pointerEnabled: "none",
      currentUser: localStorage.getItem('currentUser'),
      resultStatus: "",
      modelApi: "",
      errorBody:"",
      errorType:""
    }
    //method binding
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
    this.getData = this.getData.bind(this)
    this.getResult = this.getResult.bind(this)
    this.showData = this.showData.bind(this)
    this.onResultFetched = this.onResultFetched.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.hideFailAlert = this.hideFailAlert.bind(this)
    this.componentDidCatch = this.componentDidMount.bind(this)
    this.logUpload = this.logUpload.bind(this)
    this.fetchApi = this.fetchApi.bind(this)
    this.loadProfileView = this.loadProfileView.bind(this)



  }


  componentDidMount() {
    this.setCurrentUser();
    this.fetchApi();
    console.log(this.UPLOAD_ENDPOINT)
    AOS.init();

  }
  //on image submit
  async onSubmit(e) {
    e.preventDefault()
    if (this.state.file != null || this.state.userPlant != "none") {
      if (this.state.file != null) {

        if (this.state.userPlant == "none") {
          toast.error("You have to select a Plant")
        }
        else {
          //show Loader
          this.setState({ uploading: true })
          let res = await this.uploadFile(this.state.file);
          //response - image URL
          console.log(res.data.url);
          this.setState({ returnPath: res.data.url })
          //request from Azure
          this.sendRequest();



          //getResult
          // this.getResult();
        }
      }
      else {
        toast.error("Please select image")
      }



    }

    else {
      toast.error("You have to select Plant and Image to begin")

    }



  }
  onChange(e) {

    this.setState({ file: e.target.files[0] })
  }

  async uploadFile(file) {

    //append
    const formData = new FormData();

    formData.append('avatar', file)

    return await axios.post(this.UPLOAD_ENDPOINT, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }

  sendRequest() {
    
    //Azure credentials 
    var res = axios.post(this.state.modelApi, { Url: this.state.returnPath },
      {
        headers: {
          "prediction-key": process.env.REACT_APP_AZURE_KEY,
          "content-type": "application/json"

        }
      })
      //response on Promise 
      .then(res => this.getData(res))



    // console.log(res.data);
    //res.data.headers['Test-Header'];

  }

  fetchApi() {
    var apiEndPoint = process.env.REACT_APP_API_ROOT+"/getApi.php";
    axios.post(apiEndPoint)
      .then(res => {
        const data = res.data;
        this.setState({ modelApi: data.url })

      })



  }




  //fetch response
  getData(res) {
    //class with highest probability 

    var len = res.data.predictions.length;
    for (var x = 0; x <= len - 1; x++) {
      var max = res.data.predictions[0].probability;
      var maxIndex = 0;
      if (res.data.predictions[x].probability > max) {
        max = res.data.predictions[x].probability
        maxIndex = x;
      }

    }
    console.log("max  " + max);
    console.log("max Index  " + maxIndex);

    //var val = res.data.predictions[0].tagName;
    //var prob = res.data.predictions[0].probability;
    var val = res.data.predictions[maxIndex].tagName;
    var prob = max;
    //set state
    this.setState({ output: val })
    this.setState({ probability: prob })

    const healthyTags = ["H01","H02", "H03","H04", "H05"]

    if(healthyTags.includes(this.state.output))
    {
      console.log(`Healthy Plant : ${this.state.output}`)
    
      console.log(this.state.probability)
      if(this.state.probability>0.5)
      {
        
    //  alert("No Disease")
      
      this.setState({score:0,errorBody:"This is a healthy plant",uploading:false,errorType:"positive"})
    
      //test outputs
      console.log("Class: " + this.state.output)
      console.log("Prob: " + this.state.probability)

      }
      else
      {
        this.setState({score:0,errorBody:"Invalid image. Try again",errorType:"negative",uploading:false})
       
        //test outputs
      }

    }

    else {
      //test outputs
      console.log("Class: " + this.state.output)
      console.log("Prob: " + this.state.probability)
      //alert("Class: " + this.state.output)

      var apiEndPoint = process.env.REACT_APP_API_ROOT+"/getResult.php";
      let formData = new FormData();
      var returnDid = this.state.output;
      formData.append("dID", val)
      axios.post(apiEndPoint, formData)
        .then(res => {
          const data = res.data;
          this.setState({ data });
          this.onResultFetched(data);





        })
        .catch(err => { console.log(err) })

    }



  }

  onResultFetched(data) {
    //score-> checking for fails 
    this.setState({ returnPlant: data[0].plant })
    this.setState({ Did: data[0].diseaseID })




    if (this.state.userPlant == data[0].plant && this.state.probability > 0.8) {
      //  alert("Disease Detected")
      this.setState({ next_btn_uploadBtnVisibility: 1, next_btn_pointerEnabled: "all" })

      //hide Loader
      this.setState({ uploading: false })

      //
      this.setState({ resultStatus: "Positive" })

    }

    else if (this.state.probability > 0.45) {
      //hide Loader
      //retry
      this.setState({ uploading: false })
     
      this.setState({score:0})
      this.setState({errorBody:"Oops! There is a problem with your inputs, Please try again with a different image"})
      this.setState({errorType:"negative"})
    }


    else {
      //not found
     // alert("Not found")
      //this.setState({ score: 0 })
      this.setState({ resultStatus: "Negative" })
      this.setState({score:0})
      
      this.setState({ uploading: false })
      this.setState({errorBody:"Not found"})
      this.setState({errorType:"negative"})


    }
    console.log("Return Plant " + data[0].plant)
    console.log("Return Plant (State)" + this.state.returnPlant)
    console.log("Disease ID (from DB):" + this.state.Did)
    this.logUpload();


  }
  handleSelect(event) {
    //get user plant
    this.setState({ userPlant: event.target.value })
    console.log(this.state.userPlant)
    this.setState({ uploadBtnVisibility: "block" })
    this.setState({ upload_btn_uploadBtnVisibility: 1, upload_btn_pointerEnabled: "all" })
    console.log(this.state.modelApi)

  }

  getResult() {
    var apiEndPoint = process.env.REACT_APP_API_ROOT+"/getResult.php";
    let formData = new FormData();
    var returnDid = this.state.output;
    formData.append("dID", returnDid)
    axios.post(apiEndPoint, formData)
      .then(res => {
        const data = res.data;
        this.setState({ data });


      })
      .catch(err => { console.log(err) })




  }

  logUpload() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    console.log(date)
    var apiEndPoint = process.env.REACT_APP_API_ROOT+"/logUpload.php";
    let formData = new FormData();
    formData.append("userID", localStorage.getItem('currentUserID'))
    formData.append("diseaseID", this.state.Did)



    //formData.append("date", date)
    formData.append("image", this.state.returnPath)
    formData.append("description", this.state.resultStatus)

    axios.post(apiEndPoint, formData)
      .then(res => {
        console.log(res.data)
      })

      .catch(err => {
        console.log(err)
      })

  }
  loadProfileView() {
    this.props.loadProfileView()
  }

  showData() {
    //console.log(this.state.data)
    this.props.loadResultView(this.state.data)
  }

  hideFailAlert() {
    this.setState({ score: 1 })
    this.setState({ file: null })
    this.setState({ returnPath: ImgPlaceholder })
  }

  setCurrentUser() {
    this.setState({ currentUser: "" })
    if (this.props.currentUser == undefined) {
      this.setState({ currentUser: localStorage.getItem('currentUser') })
    }
    else {
      this.setState({ currentUser: this.props.currentUser })
    }
  }



  render() {

    if (this.state.uploading == true) {
      return (
        <div>
          <Loader />
        </div>
      )
    }

    if (this.state.score == 0) {
      //if detection faliure or lower probabilty 
      return (
        <div>
          <FailAlert goBack={this.hideFailAlert} msgBody={this.state.errorBody} type={this.state.errorType}/>
        </div>
      )
    }


    return (
      <>
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
        <div className="dash-container" data-aos="fade-right">


          <div className="dash-header" >
            <img src={userIcon} className="logo" onClick={this.loadProfileView} />
            <div>
              <h2 className="user-text">Welcome <br /><span className="user-text-strong" onClick={this.loadProfileView}>{this.state.currentUser.substring(0, 15)}... </span></h2>
            </div>

          </div>
          <div className="page-content" data-aos="fade-right">
            <div className="main-container">
              <img src={this.state.returnPath} className="img-captured"></img>
              <div>
                <h1 className="subhead-text">Get Disease Information About Plant</h1>
                <p className="text-info">Select Plant and image of the infected area
                  of the plant</p>
                <div className="center-child-container">

                  <form onSubmit={this.onSubmit}>
                    <div className="btn-row">
                      <select className="dropdown" name="userPlant" id="userPlant" value={this.state.userPlant} onChange={this.handleSelect}>
                        <option value="none">Select</option>
                        <option value="Rose Plant">Rose Plant</option>
                        <option value="Anthurium">Anthurium </option>
                        <option value="Banana">Banana  </option>
                        <option value="Orchid">Orchid  </option>
                        <option value="Banana">Banana</option>
                        <option value="Watermelon">Watermelon </option>

                      </select>
                      <input type="file" className="btn-file" onChange={this.onChange} />
                    </div>
                    <button type="submit" className="btn-lgreen mobile-btn mt-5" style={{ width: "97%", opacity: this.state.upload_btn_uploadBtnVisibility, pointerEvents: this.state.pointerEnabled }}> Upload</button>
                    <button type="button" className="btn-dgreen" onClick={this.showData} style={{ width: "97%", opacity: this.state.next_btn_uploadBtnVisibility, pointerEvents: this.state.next_btn_pointerEnabled }}>Next</button>
                  </form>

                </div>



              </div>


            </div>

          </div>

        </div>
      </>
    )
  }

}


export default Dashboard;