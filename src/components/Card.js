import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
class Card extends React.Component{

    constructor(props)
    {
        super(props)
        this.state={
            cardState:"none",
            expandBtnText:"Show More",
            cardData:{
                plant:this.props.plant,
                companyName:this.props.companyName,
                companyID:this.props.companyID,
                companyEmail:this.props.email,
                userID: localStorage.getItem('currentUserID'),
                userEmail:localStorage.getItem('currentUser'),
                diseaseName:this.props.diseaseName,
                userName:localStorage.getItem('currentUserName')
            }

        }
        this.expandCard = this.expandCard.bind(this)
        this.loadConsultView = this.loadConsultView.bind(this)
    }
    componentDidMount()
    {
        AOS.init();
      //  console.log("Com EMail" + this.props.email)
    }
    //card expand
    expandCard()
    {
        if(this.state.cardState=="none")
        {
            this.setState({cardState:"block",expandBtnText:"Show Less"})


        }
        else
        {
            this.setState({cardState:"none",expandBtnText:"Show More"})
        }
        
    }


    loadConsultView()
    {
        this.props.loadConsultView(this.state.cardData)
    }

    render()
    {
        return(
            <div className="solution-card" data-aos="fade-up">
            <div className="solution-card-content">  
             <p style={{ fontWeight: "500", fontSize: "1.3em" }}>{this.props.productName} - {this.props.companyName}</p>
            </div>

            <div className="solution-card-content">
          
                <p><strong>Product Type: </strong> {this.props.productType}</p>
                <p><strong>Price: </strong> {this.props.productPrice}</p>
               
                <p><strong>Plant:  </strong>{this.props.plant}</p>
               
               
               
                <div style={{display:this.state.cardState, alignItems:"center"}} >
                <p><strong>Description: </strong>{this.props.description}</p>
                <p><strong> Availability: </strong> {this.props.availability}</p>
               
             
              
                <div className="solution-card-content" style={{alignItems:"center"}}>
               
            </div>
                </div>
                <div className="solution-card-content" style={{alignItems:"center"}}>
                <button className=" btn-card" onClick={this.expandCard}>{this.state.expandBtnText}</button>
                <button className=" btn-card" onClick={this.loadConsultView} >Consult</button>
                </div>
               

            </div>
        
           
        </div>
        )
    }
}

export default Card;