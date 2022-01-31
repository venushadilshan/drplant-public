import React from 'react'
import axios from 'axios';

class ImgUpload extends React.Component {

  UPLOAD_ENDPOINT = process.env.REACT_APP_API_ROOT+'/uploadImg.php';
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      returnPath: "",
      uploading: "",
      output:"",
      version:1
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.testReq = this.testReq.bind(this)
    this.getData = this.getData.bind(this)
  }
  async onSubmit(e) {
    e.preventDefault()
    let res = await this.uploadFile(this.state.file);
    console.log(res.data.url);
    this.setState({ returnPath: res.data.url })
    //this.testReq();
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  async uploadFile(file) {


    const formData = new FormData();

    formData.append('avatar', file)

    return await axios.post(this.UPLOAD_ENDPOINT, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }

  testReq() {
    var res = axios.post('https://centralindia.api.cognitive.microsoft.com/customvision/v3.0/Prediction/ea03355b-f26d-4c2f-bf76-8b428f37004c/classify/iterations/Iteration1/url', { Url: this.state.returnPath },
      {
        headers: {
          "prediction-key": "e7c584b6690e4804ad7a5d894464e6ab",
          "content-type": "application/json"

        }
      })
      .then(res => this.getData(res))
    
      

    // console.log(res.data);
    //res.data.headers['Test-Header'];

  }

  getData(res)
  {
    var val = res.data.predictions[0].tagName;
    this.setState({output:val})

  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1> If I tell you what will happen, it won't happen</h1>
          <h1>Class:{this.state.output}</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload </button>
          <img src={this.state.returnPath} style={{width:"20%"}}/>
        </form>
        <button onClick={this.testReq}>Test</button>
      </div>

    )
  }

}

export default ImgUpload;