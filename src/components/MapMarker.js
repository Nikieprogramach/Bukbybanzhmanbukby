import React from "react";

import {
 Marker,
} from "react-simple-maps"

function MapMarker(name, coordinates) {
  return (
    <Marker key={name} coordinates={coordinates}>
        <circle r={5} fill="#F00 "/>
        <h1>{name}</h1>
    </Marker>
  );
}

export default MapMarker;
