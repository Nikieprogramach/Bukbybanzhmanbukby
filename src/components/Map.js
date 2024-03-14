import React, { useState } from "react";
import {
 ComposableMap,
 Geographies,
 Geography,
 Marker,
 Annotation,
 ZoomableGroup
} from "react-simple-maps"

import {Tooltip as ReactTooltip} from "react-tooltip"
import 'react-tooltip/dist/react-tooltip.css'

import MapMarker from "./MapMarker";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

const Markers = [
    {
        name: "Tochka",
        coordinates: [-43.13749, 147.86636] // flipped cords [East, North]
    }
]

function Map() {
    const [content, setContent] = useState("")
    return (
        <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <ReactTooltip id="tooltip" place="top" content={content}/>
            <div style={{width: "100vw"}}>
                <ComposableMap data-tip="" style={{height: "100vh", width: "100vw"}}>
                    <ZoomableGroup zoom={1}>
                        {" "}
                        <Geographies geography="/map.json">
                            {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} data-tooltip-id = "tooltip" onMouseEnter={() => {setContent(geo.properties.name); console.log(content)}} onMouseLeave={() => {setContent("")}} style={{hover: {fill: "red", outline: "none"}}}/>
                            ))
                            }
                        </Geographies>
                        {
                            Markers.map(({name, coordinates}) => (
                                <Marker key={name} coordinates={coordinates}>
                                    <circle r={1} fill="#F00" strokeWidth={2}/>
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
