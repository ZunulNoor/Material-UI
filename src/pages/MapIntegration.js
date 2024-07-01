import React, { Component } from 'react';
import { Map, GoogleApiWrapper, DirectionsRenderer } from 'google-maps-react';

class MapIntegration extends Component {
  state = {
    directions: null,
    origin: '',
    destination: '',
  };

  handleGetDirections = () => {
    const { google } = this.props;
    const { origin, destination } = this.state;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  render() {
    const { google } = this.props;
    const { directions, origin, destination } = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Enter starting point"
            value={origin}
            onChange={(e) => this.setState({ origin: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => this.setState({ destination: e.target.value })}
          />
          <button onClick={this.handleGetDirections}>Get Directions</button>
        </div>
        <div style={{ width: '100%', height: '400px' }}>
          <Map
            google={google}
            initialCenter={{ lat: 37.774929, lng: -122.419418 }}
            zoom={14}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{ draggable: true }}
              />
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBw4FA4NMKEzBoTwXZI8c2gHf-wf9juUKs',
})(MapIntegration);
