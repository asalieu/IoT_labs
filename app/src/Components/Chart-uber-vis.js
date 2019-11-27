import React, { Component, Fragment } from 'react';
// import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
// import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
// import './chart.css';
import '../CSS/style.css';
import { FlexibleWidthXYPlot, ChartLabel, VerticalBarSeries, XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        // console.log(this.props.data)
        const timestamp = new Date().getTime();
        // console.log(timestamp)
        const MSEC_DAILY = 86400000;
        // console.log(this.props.chartData);
        const data = [
            { x: 0, y: 8 },
            { x: 1, y: 5 },
            { x: 2, y: 4 },
            { x: 3, y: 9 },
            { x: 4, y: 1 },
            { x: 5, y: 7 },
            { x: 6, y: 6 },
            { x: 7, y: 3 },
            { x: 8, y: 2 },
            { x: 9, y: 0 },
            { x: 10, y: 8 },
            { x: 11, y: 5 },
            { x: 12, y: 4 },
            { x: 13, y: 9 },
            { x: 14, y: 1 },
            { x: 15, y: 7 },
            { x: 16, y: 6 },
            { x: 17, y: 3 },
            { x: 18, y: 2 },
            { x: 19, y: 5 },
            { x: 20, y: 6 }
        ];



        const divStyle = {
            marginLeft: 0,
            marginRight: 0
        };
        return (
            <div>
                <span>{this.props.title}</span>
                <div className="card-env" >
                    <FlexibleWidthXYPlot xType="time" height={270} >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <ChartLabel
                            text="X Axis"
                            className="alt-x-label"
                            includeMargin={true}
                            xPercent={0.025}
                            yPercent={1.01}
                        />
                        <LineSeries style={{ strokeLinejoin: "round" }} data={this.props.data} curve={'curveMonotoneX'} />
                    </FlexibleWidthXYPlot>
                </div>
            </div>


        )
    }
}

export default Chart;