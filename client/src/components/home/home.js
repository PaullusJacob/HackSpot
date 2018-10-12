import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './home.css'
import axios from 'axios';




class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hackathons: [
                {
                    name:"",
                    start: "",
                    end: "",
                    lat: "",
                    lng: "",
                    city: "",
                    state: ""
                }
            ],
            addResponse: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            defaultProps: {
                center: {
                  lat: 39.8283,
                  lng: -98.579
                },
                zoom: 4
            }
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8081/get")
            .then(res => {
                this.setState ({hackathons: res.data});
            })
    }


    onMarkerClick = (props, marker, e) => {
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        })
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    addMarker = (data) => {
        return data.map((item, i) => {
            return (
                    <Marker
                        key={i}
                        onClick={this.onMarkerClick}
                        title={'The marker`s title will appear as a tooltip.'}
                        name={data[i].name}
                        position={{lat: data[i].lat, lng: data[i].lng}}
                    />
            )
        })
    }



   
    render() {
        console.log("rendering")
        return (

            <div>
                <div>
                    

                    <Map
                        onClick = {this.onMapClicked}
                        google = {this.props.google}
                        initialCenter = {{
                            lat: 39.8283,
                            lng:-98.579
                        }}
                        zoom={4}
                    >

                        <Marker
                            onClick={this.onMarkerClick}
                            title={'The marker`s title will appear as a tooltip.'}
                            name={this.state.name}
                            position={{lat: 39.8283, lng: -98.579}}
                        />

                        {addMarker(this.state.hackathons)}
                        
                    
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={this.state.showingInfoWindow}
                        >
                                <div>
                                    <h1>{this.state.selectedPlace.name}</h1>
                                </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
      );
    }
  }
  

export default GoogleApiWrapper({
    apiKey: ("AIzaSyD8W5OzuAhjzrtbQGMpd5UUZpekdOUG5cI")
})(Home)
