import React from 'react';

import GoogleMapReact from 'google-map-react';
import GoogleMapMarkers from 'google-map-react';
import Markers from './Markers.jsx';

const style = {
  position: 'fixed',
  overflow: 'visible',
  top: 190,
  left: 65,
  width: '45%',
  height: '70%',
  margin: 0,
  padding: 0
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // we hard-coded this map center but ideally you'll be able to set location based on google search
      zoom: 13,
      markerLocs: []
    }
  }

  handleClick(event) {
    // should there even be a handleClick for the map itself?
    // or should there just be a hover event for markers?
    // or should clicking on the marker highlight all concerts at that venue?
  }

  componentWillReceiveProps(nextProps) {
    let events = nextProps.events;
    let venues = events.map((event) => {
      return {
        lat: event.location.lat,
        lng: event.location.lng,
        name: event.venue.displayName
      }
    });
    this.setState({
      markerLocs: venues

    });
  }

  render() {
    let context = this;
    let markers = this.state.markerLocs.map((loc) => {
      return <Markers hovered={this.props.hovered} name={loc.name} lat={loc.lat} lng={loc.lng} />
    });
    return (
      <div style={style}>
        <GoogleMapReact
          defaultCenter={{lat: 37.783607, lng:-122.408967}}
          center={this.props.mapCenter}
          defaultZoom={this.state.zoom}
        >
          {markers}
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map;
