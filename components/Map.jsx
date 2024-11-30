import React from "react";
import GoogleMapReact from "google-map-react";
import { HiOutlineLocationMarker } from "react-icons/hi";

// Component to render marker on map
const AnyReactComponent = ({ text }) => (
  <div className="text-red-700"><HiOutlineLocationMarker className="text-2xl"></HiOutlineLocationMarker></div>
);

const Map = ({ lat, lng }) => {
    // console.log("lattide & lng ===>>", lat, lng);
  const defaultProps = {
    center: {
      lat: lat, 

      lng: lng,

    },
    zoom: 14,
  };

  return (
    <div style={{ height: "150px", width: "200px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={lat} lng={lng} text="My Shop" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
