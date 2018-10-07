import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './home.css'
import axios from 'axios';


class Home extends Component {



    state = {
        hackathons: [],
        addResponse: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }


    static defaultProps = {
      center: {
        lat: 39.8283,
        lng: -98.579
      },
      zoom: 4
    };

    componentDidMount() {
        console.log("Hello2");
        axios.get("http://localhost:8081/get")
            .then(res => {
                this.setState ({hackathons: res.data});
               
            })

        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD8W5OzuAhjzrtbQGMpd5UUZpekdOUG5cI")
            .then(response => {
                this.setState ({addResponse: response.data})
                console.log(this.state.addResponse)
            })
    }
   
    render() {
      return (
        <div>
            <div>
                {console.log(this.state.hackathons[0])}
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
                        name={this.state.hackathons[0]}
                        position={{lat: 37.778519, lng: -122.405640}}
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
