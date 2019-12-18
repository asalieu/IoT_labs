import React, { Component } from 'react';
import '../CSS/style.css';
// import { faThermometerHalf, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import currentConditions from '../images/environment.png';
// import humidity from '../images/airhumidity.png';
// import carbon from '../images/airCo2.png';
import {Grid} from "@material-ui/core";
import DisplayMeasurements from './DisplayMeasurements.js';


// const iconStyle = {
//     marginLeft: 25,
//     marginRight: 25
// }

class EnvironmentComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {
            temperature: 0,
            humidity: 0,
            pressure: 0,
            eco2: 0
        }

    }

    componentDidMount() {
        
    }
 

    render() {
        return (
            <Grid container spacing={5} >
                <Grid item xs={4} sm={4} lg={3}>
                    <DisplayMeasurements
                        TheData = {'Temperature'}
                        TheReading = {this.props.data.temperature}
                        TheUnit = {'°C'}  />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <DisplayMeasurements
                        TheData = {'Pressure'}
                        TheReading = {this.props.data.pressure}
                        TheUnit = {'mmHg'}  />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <DisplayMeasurements
                        TheData = {'Humidity'}
                        TheReading = {this.props.data.humidity}
                        TheUnit = {'%'}  />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <DisplayMeasurements
                        TheData = {'CO'}
                        TheReading = {this.props.data.eco2}
                        TheUnit = {'ppm'}  />
                </Grid>
            </Grid>
        );
    }
}

export default EnvironmentComponent;