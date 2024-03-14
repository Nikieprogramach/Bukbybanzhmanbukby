import React from "react";

import {
 ComposableMap,
 Geographies,
 Geography,
 Marker,
 Annotation,
 ZoomableGroup
} from "react-simple-maps"
import MapMarker from "./MapMarker";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const Markers = [
    {
        name: "Tochka",
        coordinates: [23.3219, 42.6977] // flipped cords [East, North]
    }
]

function Map() {
  return (
    <div style={{width: "100%", height: "100%", display: "flex"}}>
        <div style={{width: "1400px"}}>
            <ComposableMap>
                <ZoomableGroup zoom={1}>
                    <Geographies geography="/map.json">
                        {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))
                        }
                    </Geographies>
                    {
                        Markers.map(({name, coordinates}) => (
                            <Marker key={name} coordinates={coordinates}>
                                <circle r={5} fill="#F00" strokeWidth={2}/>
                                <h1>{name}</h1>
                            </Marker>
                        ))
                    }                    
                </ZoomableGroup>
            </ComposableMap>
        </div>
    </div>
  );
}

export default Map;
