import React, { Component }  from "react";
import ReactDOM from "react-dom";
import Chart from 'react-apexcharts'
import ApexCharts from 'apexcharts/dist/apexcharts.common'

  var lastDate = 0;
  var data = []
  var TICKINTERVAL = 86400000
  let XAXISRANGE = 777600000

  var lastTime = 0;
  var datax = []
  var TICKINTERVALx = 5000
  let XAXISRANGEx = 60000

  var minimumY = 27;
  var maximumY = 32;

  function getDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      while (i < count) {
          var x = baseval;
          var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

          data.push({
              x, y
          });
          lastDate = baseval
          baseval += TICKINTERVAL;
          i++;
      }
  }

  getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
      min: 0,
      max: 30
  })

  function getNewSeries(baseval, yrange) {
      var newDate = baseval + TICKINTERVAL;
      lastDate = newDate

      for(var i = 0; i< data.length - 10; i++) {
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          data[i].x = newDate - XAXISRANGE - TICKINTERVAL
          data[i].y = 0
      }
      
      data.push({
          x: newDate,
          y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
      })
      
  }

  function resetData(){
      // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
      data = data.slice(data.length - 10, data.length);
  }

  function getTimeSeries(baseval, count, yrange) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = minimumY;

        datax.push({
            x, y
        });

        lastTime = baseval
        baseval += TICKINTERVALx;
        i++;
    }

  }

  getTimeSeries(new Date('11 Dec 2019 GMT').getTime(), 10, {
      min: 0,
      max: 30
  })

  function getNewSeriesx(baseval, yrange,temp) {
    // console.log('Baseval' + baseval);
    var newTime = baseval + TICKINTERVALx;
    lastTime = newTime

     for(var i = 0; i< datax.length - 10; i++) {
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          console.log(i);
          let current = datax.length -10;
          datax[i].x =datax[current].x;
          datax[i].y = datax[current].y;
          
      }

    data.push({
        x: newTime,
        y: temp
    })

    
}

  class LineChart extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
            id: 'realtime',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 5000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },

          title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime',
            range: XAXISRANGEx,
          },
          yaxis: {
            min: minimumY,
            max: maximumY
          },
          legend: {
            show: false
          }
      },
      series: [{
        data: data.slice()
      }],
    }
  }


  
  componentDidMount() {
    this.intervals()
  }

  intervals () {
    window.setInterval(() => {
      // getNewSeries(lastDate, {
      //   min: 26,
      //   max: 33
      // })

      // getNewSeriesx(lastTime, {
      //   min: minimumY,
      //   max: 32
      // })
      this.getInfo();

      console.log(data);
      ApexCharts.exec('realtime', 'updateSeries', [{
        data: data
      }])
    }, 5000)
  }

  getInfo(){
    fetch(`http://localhost:3002/`)
    // fetch(`http://192.168.137.246:3002/`)
    .then(response => response.json())
    .then((response)  => {
       console.log(response);

       getNewSeriesx(lastTime, {
        min: minimumY,
        max: maximumY
      },response.temp)

    })
  }

  render() {

    return (
      

        <div id="chart">
          <Chart options={this.state.options} 
          series={this.state.series} type="line" height="350" />
          {/* React.createElement(LineChart) */}
        </div>

    );
  }

}

export default LineChart;
