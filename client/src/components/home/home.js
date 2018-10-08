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
        var items = [];
        
        items = data;
        console.log(data);
        return items.map( (item, i) => {
            return (
                    <Marker
                        eventKey={i}
                        onClick={this.onMarkerClick}
                        title={'The marker`s title will appear as a tooltip.'}
                        name={item.name}
                        position={{lat: item.lat, lng: item.lng}}
                    />
            )
        }) 
    }

class Home extends Component {

    state = {
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

    componentDidMount(){
        axios.get("http://localhost:8081/get")
            .then(res => {
                this.setState ({hackathons: res.data});
            })
    }

   
    render() {
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
