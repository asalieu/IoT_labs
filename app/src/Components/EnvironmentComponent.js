import React, { Component } from 'react';
import '../CSS/style.css';
import { faThermometerHalf, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import currentConditions from '../images/environment.png';
import humidity from '../images/airhumidity.png';
import carbon from '../images/airCo2.png';
import axios from 'axios';
// import ReactDOM from 'react-dom';
// import { connect } from "react-redux";
// import fetchNewReading from '../actions/actionTypeConstants';


const iconStyle = {
    marginLeft: 25,
    marginRight: 25
}

class EnvironmentComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {
            temperature: undefined,
            humidity: undefined,
            pressure: undefined,
            eco2: undefined
        }

    }

    componentDidMount() {
        console.log("called component didmount");
        console.log(process.env.REACT_APP_BACKEND_URL);

        axios.get(process.env.REACT_APP_BACKEND_URL + 'getSensorValue')
            .then(res => {
                console.log(res.data.currentData);
                this.setState({
                    temperature: res.data.currentData.temperature,
                    pressure: res.data.currentData.pressure,
                    humidity: res.data.currentData.humidity,
                    eco2: res.data.currentData.eco2
                });
        })
    }


    render() {
        return (
            <div className="card-env">

                <div className="row">
                    <div className="col-lg-3 col-sm-3 col-xs-3">
                        <div className="row">
                            {/* <img hspace={15} src={temp} /> */}
                            <FontAwesomeIcon size='1x' icon={faThermometerHalf} fixedWidth={10} style={iconStyle} /> Temperature
                    </div>
                        <div className="row">
                            <span style={{ marginLeft: 20 }}>{this.props.data.temperature}</span><span>&deg;C</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-3 col-xs-3">
                        <div className="row">
                            <FontAwesomeIcon size='1x' icon={faTachometerAlt} fixedWidth={10} style={iconStyle} /> Pressure
                    </div>
                        <div className="row">
                            <span style={{ marginRight: 5 }}>{this.props.data.pressure}</span><span> hPa</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-3 col-xs-3">
                        <div className="row">
                            <img style={iconStyle} height={18} width={18} src={humidity} /> Humidity
                    </div>
                        <div className="row">
                            <span style={{ marginLeft: 20, marginRight: 2 }}>{this.props.data.humidity}</span><span> &#37;</span>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-3 col-xs-3">
                        <div className="row">
                            <img style={{ marginRight: 15 }} height={18} width={18} src={carbon} /> CO2
                    </div>
                        <div className="row">
                            <span style={{ marginLeft: 7, marginRight: 2 }}>{this.props.data.eco2}</span><span> ppm</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }




}

export default EnvironmentComponent;
// export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentComponent);