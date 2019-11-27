import React, { Component } from 'react';
import { MDBBtn } from "mdbreact";
import { Player, BigPlayButton } from 'video-react';
import axios from 'axios';
import '../CSS/style.css';

class RoomAppliancesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hsApiPlugState: false,
            videoURL: undefined
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log("Button Clicked", process.env.REACT_APP_HSAPI_PLUG_LOCAL_URL);
        let currentStatus = this.state.hsApiPlugState;
        axios.get(process.env.REACT_APP_HSAPI_PLUG_LOCAL_URL, {
            params: {
                plugStatus: !currentStatus
            }
        })
            .then(res => {
                console.log(res);
                this.setState({ hsApiPlugState: res.data.plugStatus })
            }).catch(error => console.log);
    }

    componentDidMount() {

        // setInterval(()=>{
        //     axios.get(process.env.REACT_APP_BACKEND_URL + 'getFirebaseVideoURL')
        //     .then(res => {
        //         // console.log(res);
        //         this.setState({ videoURL: res.data.video_url })
        //     })

        // axios.get(process.env.REACT_APP_BACKEND_URL + 'getSmartPlugState')
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ hsApiPlugState: res.data.plugStatus })
        //     })
        // },5000)

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
        console.log(this.state.hsApiPlugState)
        const buttonColor = this.state.hsApiPlugState ? <MDBBtn onClick={this.handleClick} color="primary">Switch state</MDBBtn> :
            <MDBBtn onClick={this.handleClick} color="danger">Switch state</MDBBtn>;
        return (
            <div className="card-env">
                <div className="row">
                    <div className="col-lg-4 col-sm-4 col-xs-4">
                    <span>TPLink Plug Status</span>
                        {buttonColor}
                    </div>
                    <div className="col-lg-8 col-sm-8 col-xs-8" >
                        <div>
                            <span>Latest video from PIR Sensor</span>
                            <Player
                                playsInline
                                fluid={false}
                                poster="/assets/poster.png"
                                src={this.state.videoURL}
                                width={300}
                                height={150}
                            >
                                <BigPlayButton position="center" />
                            </Player>
                        </div>
                    </div>
                </div>

            </div>
        );

    }

}

export default RoomAppliancesComponent;