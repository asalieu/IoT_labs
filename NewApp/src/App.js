import React, { Component } from 'react';
import axios from 'axios';
// import NavbarComponent from './Components/NavbarComponent';
// import ChartComponent from './Components/ChartComponent';
import EnvironmentComponent from './Components/EnvironmentComponent';
// import Chart from './Components/Chart-uber-vis';
// import RoomAppliancesComponent from './Components/RoomAppliancesComponent';

// import LineChart from './Components/Test';
import LineChart from './Components/LineChart';
import SmartPlug from './Components/SmartPlug';
import VideoPlay from './Components/VideoPlay';

import './App.css';
// import currentConditions from '../src/images/environment.png';
import _ from "underscore";
import Moment from "moment";//t
import {Grid, Container} from "@material-ui/core";

class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      temperatureDataPoints : undefined,
      pressureDataPoints : undefined,
      humidityDataPoints : undefined,
      temperature: undefined,
      humidity: undefined,
      pressure: undefined,
      eco2: undefined,
      tickinterval: 86400000,
      xaxisrange: 777600000
    }
  }

  handleEnvironmentDataProcessing = (data) => {
    let environmentData = []
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        environmentData.push(data[key]);
        // console.log(environmentData);
      }
    }
    return environmentData;
  }

  getEnvironmentalData = () => {
    axios.get(process.env.REACT_APP_BACKEND_URL)
    .then(response => {
        let environmentData = this.handleEnvironmentDataProcessing(response);
        this.setState({
          // temperature: res.data.currentData.temperature,
          // pressure: res.data.currentData.pressure,
          // humidity: res.data.currentData.humidity,
          // eco2: res.data.currentData.eco2

          temperature: response.temp,
          pressure: response.pres,
          co2: response.eco2,
          // tvoc: response.tvoc,
          humidity: response.humi,
        })
        let temperatureDataPoints = [];
        let pressureDataPoints = [];
        let humidityDataPoints = [];

        
        _.each(environmentData, (readings,index) => {
          
          let time = new Moment(readings.timestamp).toDate().getTime();
          const tempReading = readings["temperature"];
          const pressureReading = readings["pressure"];
          const humidityReading = readings["humidity"] ;
          time = time + 86400000 
          
          temperatureDataPoints.push({x:time, y:tempReading});
          pressureDataPoints.push({x:time, y:pressureReading});
          humidityDataPoints.push({x:time, y:humidityReading});
        });
        // this.setState({temperatureDataPoints:temperatureDataPoints,pressureDataPoints:pressureDataPoints,humidityDataPoints:humidityDataPoints})
      }
    )
  }


  componentDidMount() {

    setInterval(() => {
      this.getInfo();
    },10000)
    
  }

  getInfo(){
    fetch(process.env.REACT_APP_BACKEND_URL)
    .then(response => response.json())
    .then((response)  => {
       console.log(response);
      if (response){      
        // this.setState({donationData: response });
        this.setState ({
          temperature: response.temp,
          pressure: response.pres,
          eco2: response.eco2,
          // tvoc: response.tvoc,
          humidity: response.humi,
          // color: props.color,
        })
        // this.state.temperature.activeTab 
        
      }

    })
  }

  render() {
    // console.log(this.state)
    const data = {
      temperature: this.state.temperature,
      pressure: this.state.pressure,
      humidity: this.state.humidity,
      eco2: this.state.eco2
    };

    return (
      <div className="App">
        {/* <div id="chart">
          <LineChart />
        </div> */}
        <Container component="main" >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={6}>
              <EnvironmentComponent data={data}  />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              {/* <RoomAppliancesComponent  /> */}
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={4}>
              {/* <LineChart  
                TheTitle={'Temperature'}
                TheMinimum={27}
                TheMaximum={33}
                TheXAxisRange={12000}
                TheTickInterval={2000}


                /> */}
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
            <LineChart  
                TheTitle={'Pressure'}
                TheMinimum={395}
                TheMaximum={430}
                TheXAxisRange={12000}
                TheTickInterval={2000}


                />
            </Grid>
            {/* <Grid item xs={12} sm={12} lg={4}>
              <LineChart  />
            </Grid> */}
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={6}>
              <SmartPlug  />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <VideoPlay  />
            </Grid>
          </Grid>

        </Container>

        {/* <NavbarComponent />
        <div className="card-env">
          <div className="row">

            <div className="col-lg-6 col-sm-6 col-xs-6">
              <div className="row">
                <img hspace={15} height={22} width={22} src={currentConditions} />
                <span>Current Room Conditions</span>
              </div>
              <EnvironmentComponent data={data}  />
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-6">
              <RoomAppliancesComponent />
            </div>
          </div>
        </div>
        <div className="card-env">
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-xs-4">
              <Chart title={"Temperature Readings"}  data={this.state.temperatureDataPoints}/>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-4">
              <Chart title={"Pressure Readings"} data={this.state.pressureDataPoints} />
            </div>
            <div className="col-lg-4 col-sm-4 col-xs-4">
              <Chart title={"Humidity Readings"} data={this.state.humidityDataPoints} />
            </div>
          </div>
        </div> */}
        

      </div>
    );
  }
}

export default App;
