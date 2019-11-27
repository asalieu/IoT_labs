import React, { Component } from 'react';
import axios from 'axios';
import NavbarComponent from './Components/NavbarComponent';
import EnvironmentComponent from './Components/EnvironmentComponent';
import ChartComponent from './Components/ChartComponent';
import Chart from './Components/Chart-uber-vis';
import RoomAppliancesComponent from './Components/RoomAppliancesComponent';
//import logo from './logo.svg';
import './App.css';
import currentConditions from '../src/images/environment.png';
import _ from "underscore";
import Moment from "moment";
const sample = [
 {
          "eco2": 0,
          "humidity": 0,
          "pressure": 0,
          "temperature": 22.48,
          "timestamp": "2018-12-28 12:04:30",
          "tvoc": 0
      },
       {
          "eco2": 400,
          "humidity": 34,
          "pressure": 1021.64,
          "temperature": 22.4,
          "timestamp": "2018-12-28 12:04:36",
          "tvoc": 0
      },
       {
          "eco2": 408,
          "humidity": 35,
          "pressure": 1021.73,
          "temperature": 22.5,
          "timestamp": "2018-12-28 12:04:42",
          "tvoc": 1
      },
       {
          "eco2": 402,
          "humidity": 36,
          "pressure": 1021.78,
          "temperature": 22.62,
          "timestamp": "2018-12-28 12:04:48",
          "tvoc": 0
      },
       {
          "eco2": 409,
          "humidity": 35,
          "pressure": 1021.75,
          "temperature": 22.83,
          "timestamp": "2018-12-28 12:04:54",
          "tvoc": 1
      },
       {
          "eco2": 420,
          "humidity": 36,
          "pressure": 1021.86,
          "temperature": 22.96,
          "timestamp": "2018-12-28 12:05:00",
          "tvoc": 3
      },
      {
          "eco2": 416,
          "humidity": 34,
          "pressure": 1021.71,
          "temperature": 22.9,
          "timestamp": "2018-12-28 12:05:06",
          "tvoc": 2
      },
       {
          "eco2": 414,
          "humidity": 37,
          "pressure": 1021.78,
          "temperature": 22.94,
          "timestamp": "2018-12-28 12:05:12",
          "tvoc": 2
      },
       {
          "eco2": 400,
          "humidity": 35,
          "pressure": 1021.74,
          "temperature": 23.24,
          "timestamp": "2018-12-28 12:05:18",
          "tvoc": 0
      }
]
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
      eco2: undefined
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
    axios.get(process.env.REACT_APP_BACKEND_URL + 'getSensorValue').then(
      res => {
        let environmentData = this.handleEnvironmentDataProcessing(res.data.allData);
        this.setState({
          temperature: res.data.currentData.temperature,
          pressure: res.data.currentData.pressure,
          humidity: res.data.currentData.humidity,
          eco2: res.data.currentData.eco2
        })
        // let environmentData = sample;
        let temperatureDataPoints = [];
        let pressureDataPoints = [];
        let humidityDataPoints = [];

        // environmentData.map()
        // console.log(environmentData)
        _.each(environmentData, (readings,index) => {
          // console.log(readings,index)
          let time = new Moment(readings.timestamp).toDate().getTime();
          const tempReading = readings["temperature"];
          const pressureReading = readings["pressure"];
          const humidityReading = readings["humidity"] ;
          time = time + 86400000 
          // console.log(time,tempReading,pressureReading)
          temperatureDataPoints.push({x:time, y:tempReading});
          pressureDataPoints.push({x:time, y:pressureReading});
          humidityDataPoints.push({x:time, y:humidityReading});
        });
        this.setState({temperatureDataPoints:temperatureDataPoints,pressureDataPoints:pressureDataPoints,humidityDataPoints:humidityDataPoints})
      }
    )
  }


  componentDidMount() {

    setInterval(() => {
      this.getEnvironmentalData();
    },5000)
    
  }

  render() {
    // console.log(this.state)
    const data = {
      temperature: this.state.temperature,
      pressure: this.state.pressure,
      humidity: this.state.humidity,
      eco2: this.state.eco2
    }
    return (
      <div className="App">

        <NavbarComponent />
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
        </div>

      </div>
    );
  }
}

export default App;
