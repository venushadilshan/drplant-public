import React from 'react';
import axios from 'axios';
import imageToBase64 from 'image-to-base64/browser';
class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileToUpload: "",
           
            arr: ""
        }

        this.handleFileSelect = this.handleFileSelect.bind(this)
        this.handleUpload = this.handleUpload.bind(this)

    }

    handleFileSelect(e) {

        this.setState({ fileToUpload: URL.createObjectURL(e.target.files[0]) })
        console.log(URL.createObjectURL(e.target.files[0]))
        console.log(this.state.fileToUpload)


    }


    handleUpload() {
        imageToBase64(this.state.fileToUpload) 
            .then(
                (response) => {
                   
                    this.setState({ arr: response })
                    console.log(this.state.arr.toString())

                }
            )
            .catch(
                (error) => {
                 
                }
            )

    }



    render() {
        return (

            <div style={{display:"flex", flexDirection:"column"}}>
                <input type="file" name="fileToUpload" id="fileToUpload" onChange={this.handleFileSelect}></input>

                <br />
                <p>{this.state.arr.toString()}</p>
                <img src={"data:image/jpg;base64," + this.state.arr} alt="" style={{ width: "60%" }}></img>
                <button onClick={this.handleUpload}>Show</button>
            </div>


        )
    }

}



export default Upload;