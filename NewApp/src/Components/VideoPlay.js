import React, { Component } from 'react';
import '../CSS/style.css';
import {Grid} from "@material-ui/core";
import VideoPlayer from 'react-simple-video-player';
// import ReactPlayer from 'react-player'

import theVideo from '../x.mp4'

class VideoPlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hsApiPlugState: false
        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <Grid container spacing={5} >
                <Grid item xs={4} sm={4} lg={3}>
                   {/* <p> Video Goes Here: </p> */}
                   <VideoPlayer url={theVideo} />
                   {/* <ReactPlayer url={theVideo} playing /> */}
                </Grid>
                
            </Grid>
        );

    }

}

export default VideoPlay;