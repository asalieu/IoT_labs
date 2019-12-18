import React, { Component } from 'react';
import axios from 'axios';
import '../CSS/style.css';
import {Grid} from "@material-ui/core";
import Netio from './Netio.js';

class SmartPlug extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hsApiPlugState: false,
            videoURL: undefined,
            portone: false,
            porttwo: false,
            portthree: false,
            portfour: false
        }
    }

    componentDidMount() {

        axios.get(process.env.REACT_APP_BACKEND_URL + 'getFirebaseVideoURL')
            .then(res => {
                // console.log(res);
                this.setState({ videoURL: res.data.video_url })
            })

        axios.get(process.env.REACT_APP_BACKEND_URL + 'getSmartPlugState')
            .then(res => {
                console.log(res);
                this.setState({ hsApiPlugState: res.data.plugStatus })
            })
    }


    render() {
        return (
            <Grid container spacing={5} >
                <Grid item xs={4} sm={4} lg={3}>
                    <Netio
                        TheData = {'1'}
                        // TheReading = {this.props.data.portone} />
                        TheReading = {this.state.portone} />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <Netio
                        TheData = {'2'}
                        TheReading = {this.state.porttwo}  />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <Netio
                        TheData = {'3'}
                        TheReading = {this.state.portthree} />
                </Grid>
                <Grid item xs={4} sm={4} lg={3}>
                    <Netio
                        TheData = {'4'}
                        TheReading = {this.state.portfour} />
                </Grid>
            </Grid>
        );

    }

}

export default SmartPlug;