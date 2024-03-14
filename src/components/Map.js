import React from "react";

import {
 ComposableMap,
 Geographies,
 Geography,
 Marker,
 Annotation,
 ZoomableGroup
} from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

function Map() {
  return (
    <div style={{width: "100%", height: "100%", display: "flex"}}>
        <p>Map</p>
        <div style={{width: "1400px"}}>
            <ComposableMap>
                <Geographies geography="./map.json">
                    {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    </div>
  );
}

export default Map;
