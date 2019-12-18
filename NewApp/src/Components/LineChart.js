import React, { Component }  from "react";
import ReactDOM from "react-dom";
import Chart from 'react-apexcharts'
import ApexCharts from 'apexcharts/dist/apexcharts.common'

  var data = [];
  var lastTime = 0;
  function resetData(){
      // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
      data = data.slice(data.length - 10, data.length);
  }

  function getTimeSeries(baseval, count, minimumY, TICKINTERVAL) {
    var i = 0;
    while (i < count) {
        var x = baseval;
        var y = minimumY;

        //Comment this out and get data starting from the edge instead of flat line first??
        data.push({
            x, y
        });

        lastTime = baseval
        baseval += TICKINTERVAL;
        i++;
    }
  }

  // getTimeSeries(new Date('11 Dec 2019 GMT').getTime(), 10)
  

  function getNewSeries(baseval, dataToPlot, TICKINTERVAL) {
    // console.log('Baseval' + baseval);
    var newTime = baseval + TICKINTERVAL;
    lastTime = newTime

     for(var i = 0; i< data.length - 10; i++) {
          // IMPORTANT
          // we reset the x and y of the data which is out of drawing area
          // to prevent memory leaks
          
          let current = data.length -10;
          data[i].x =data[current].x;
          data[i].y = data[current].y;
          
      }

    data.push({
        x: newTime,
        y: dataToPlot
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
                speed: 40000
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
            text: this.props.TheTitle,
            align: 'left'
          },
          markers: {
            size: 0
          },
          xaxis: {
            type: 'time',
            // labels: {
            //   format: 'hh:mm:ss'
            // },
            range: this.props.TheXAxisRange,
          },
          yaxis: {
            min: this.props.TheMinimum,
            max: this.props.TheMaximum
          },
          legend: {
            show: false
          }
      },
      series: [{
        data: data.slice()
      }],
    }

    // console.log(this.props.data);
    // console.log(this.props);
  }

  
  
  componentDidMount() {

    this.intervals()
  }

  intervals () {

    //getTimeSeries(new Date().getTime(), 10, this.props.TheMinimum, this.props.TheTickInterval);

    window.setInterval(() => {
      // getNewSeries(lastTime, {
      //   min: minimumY,
      //   max: 32
      // })
      this.getInfo();

      // console.log(data);
      ApexCharts.exec('realtime', 'updateSeries', [{
        data: data
      }])
    }, 1000)
  }

  getInfo(){
    fetch(`http://localhost:3002/`)
    // fetch(process.env.REACT_APP_BACKEND_URL)
    .then(response => response.json())
    .then((response)  => {
       console.log(this.props.TheTitle);
       let dataToPlot = 0;
       switch(this.props.TheTitle.toLowerCase()){
         case 'temperature':
         dataToPlot = response.temp;
         break;
         case 'humidity':
         dataToPlot = response.humi;
         break;
         case 'pressure':
         dataToPlot = response.pres;
         break;
         case 'eco2':
         dataToPlot = response.eco2;
         break;
         default:
         break;
       }

       getNewSeries(lastTime, dataToPlot, this.props.TheTickInterval)

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
