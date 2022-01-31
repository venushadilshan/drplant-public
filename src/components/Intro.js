import React from "react";
import Plant_Logo from "../assets/img/help.gif";
import AOS from 'aos';
import 'aos/dist/aos.css';
class Intro extends React.Component {
    constructor(props) {
        super(props)

        this.loadLoginView = this.loadLoginView.bind(this)
    }

    componentDidMount() {
        AOS.init();
    }

    loadLoginView()
    {
        this.props.loadLogView()
    }
    render() {
        return (
            <div className="intro-container bg-dark-green"  data-aos="fade-right" >
                <div className="intro-content"  >
                    <h1 className="login-head-text" style={{ alignSelf: "center" }}>What is Dr.Plant</h1>
                    <img src={Plant_Logo} alt="Logo" className="plant-hand-logo mt-2" />
                </div>

                <div>
                    <div className="intro-content ">
                        <h3>Planters</h3>
                        <p>As your the backbone of the agricultural system being a planter isn't just a career choice, it's a lifestyle choice.
                            So protect your valuable plants without getting them into harmful diseases with our expert guidance. Warmly Welcome to join with our hands.
                            Don't be too late and get your precious plants killed.</p>
                        <button className="btn-yellow" onClick={this.loadLoginView} style={{ alignSelf: "center" }}>Next</button>

                        <h3>Consultants</h3>
                        <p>Best place to share your knowledge as well as make some profit. Guide farmers and growers on how to enhance the efficiency, sustainability, profitability by saving their plants.
                            Assist them in developing and implementing their plans to conserve their priceless plants.</p>
                        <button className="btn-lgreen" style={{ alignSelf: "center" }}> Learn More </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Intro;