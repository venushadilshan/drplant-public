import React from 'react';
import back_icon from '../assets/img/back.png';
import virus_icon from '../assets/img/virus.svg';
import Card from './Card';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Result extends React.Component {
    
  
    constructor(props) {
        super(props);
        this.state = {
           data:this.props.dataArray,
          
        
         
            dName:"",
            dCause:"",
            prevention:"",
            cardData:{

            }

        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getDName = this.getDName.bind(this)
        this.goBack = this.goBack.bind(this)
        this.loadConsultView = this.loadConsultView.bind(this)
    }


    componentDidMount()
    {
       // console.log(this.state.data)
        this.getDName()
        AOS.init();

    }

    getDName()
    {
        this.setState({dCause:this.state.data[0].cause})
        this.setState({prevention:this.state.data[0].prevention})
        this.setState({dName:this.state.data[0].diseaseName})
        
    }

    goBack()
    {
        this.props.loadDashboardView()
    }


    loadConsultView(cardData)
    {
        
        this.props.loadConsultView(cardData)
       
    }

    setCardData()
    {
        this.setState({})
    }


    render() {
        return (
            <div data-AOS="fade-right">
                <div className="app-header">

                    <img src={back_icon} className="btn-back" onClick={this.goBack}></img>
                    <p className="label-back" onClick={this.goBack}>Back</p>

                </div>
                <div className="app-header">


               

                </div>
                <div className="page-content" style={{margin:"10px"}}>
                <p className="page-label">Disease Results</p>
                    <div className="solution-container" >
                        <div>

                            <div className="all-center">
                                <img src={virus_icon} className="icon-virus"></img>
                                <p className="text-red">Disease Detected!</p>
                                <p className="text-disease-name">{this.state.dName}</p>
                                <br />
                                <p style={{ margin: "1px" }}>Cause: {this.state.dCause}</p>
                             

                                <p className="page-label mt-2" style={{ margin: "0.5em" }}>Prevention Method</p>
                                <p style={{fontSize:"1em",width:"90%", textAlign:"center",margin: "0.1em"}}>{this.state.prevention} </p>


                            </div>

                        </div>

                        <p className="page-label mt-2" >Available Products</p>

                        <div className="solution-card-container">
  
                            
                     
                      
                        {
                        this.state.data.map(item => (
                            <Card   key={item.id} dId={item.diseaseID} productName={item.productName}  dName={item.plant}  cause={item.cause} companyName={item.companyName} productType={item.type} productPrice={item.price} 
                            description={item.description} plant={item.plant} email={item.email} tel={item.telephone} availability={item.availability} loadConsultView={this.loadConsultView} companyID={item.companyID} diseaseName={item.diseaseName} companyEmail={this.email}/>
                        ))}
                        
                        
                        </div>




                    </div>


                </div>
            </div>
        )
    }
}


export default Result;