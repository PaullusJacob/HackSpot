import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './home.css'
import axios from 'axios';


const onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
}

const onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

const addMarker = (data) => {

        // console.log(data, data.hacks);
        // for (let foo of data["hacks"]){
        //     console.log(foo);
        // }

        var thing = [
            {
                "name": "kawser" 
            },

            {
                "name": "tashfia"
            }
        ]

        thing = data;

        console.log(Object.keys(thing))

        console.log(typeof thing);

        Object.entries(data).forEach(([i, val]) => {
            console.log(i);          // the name of the current key.
            console.log(val.lat);          // the value of the current key.
        });


        return Object.entries(data).forEach(([i, val]) => {
            return (

                <li>Hello</li>
                    // <Marker
                    //     key={i}
                    //     //onClick={this.onMarkerClick}
                    //     title={'The marker`s title will appear as a tooltip.'}
                    //     name={val.name}
                    //     position={{lat: val.lat, lng: val.lng}}
                    // />
            )
        }) 
    }

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hackathons: [],
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

   
    render() {
        {console.log(addMarker(this.state.hackathons))}
        console.log("rendering")
        return (

            <div>
                <div>
                    
                    <Map
                        onlick = {this.onMapClicked}
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
                            name={"SOM"}
                            position={{lat: 37.778519, lng: -122.405640}}
                        /> 

                        <Marker
                            onClick={this.onMarkerClick}
                            title={'The marker`s title will appear as a tooltip.'}
                            name={"SOM"}
                            position={{lat: 36.778519, lng: -122.405640}}
                        />

                        

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
