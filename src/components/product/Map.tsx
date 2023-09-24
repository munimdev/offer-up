import React from 'react';
import { withGoogleMap, GoogleMap, Circle  } from 'react-google-maps';

function GoogleMapComponent(props:any) {
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: props.lat, lng: props.lng }} // Use the passed props for latitude and longitude
    >
      {/* <Marker position={{ lat: props.lat, lng: props.lng }} /> */}
      <Circle
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        radius={200} // Adjust the radius (in meters) as needed
        options={{
          fillColor: '#62C3FE', // Circle fill color
          fillOpacity: 0.35, // Fill opacity (0-1)
          strokeColor: '#62C3FE', // Circle stroke color
          strokeOpacity: 0.8, // Stroke opacity (0-1)
          strokeWeight: 2, // Stroke width
        }}
      />
    </GoogleMap>
  );
}

const WrappedMap = withGoogleMap(GoogleMapComponent);

function GoogleMapWrapper(props:any) {
  const mapStyles = {
    width: '100%',
    height: '300px',
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <WrappedMap
        containerElement={<div style={mapStyles} />}
        mapElement={<div style={mapStyles} />}
        lat={props.lat} // Pass the latitude and longitude as props
        lng={props.lng}
      />
    </div>
  );
}

export default GoogleMapWrapper;
