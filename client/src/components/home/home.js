import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import './home.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Home extends Component {
    static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyD8W5OzuAhjzrtbQGMpd5UUZpekdOUG5cI"}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text={'Kreyser Avrora'}
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
  

export default Home;