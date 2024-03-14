import React, { useState, useEffect } from "react";
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
        coordinates: [52.11329, -6.897206] // flipped cords [East, North] [latitude, longitude]
    }
]

function Map() {
    const [content, setContent] = useState("")
    const [responseData, setResponseData] = useState('');

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/getFish');
          const data = await response.json();
          setResponseData(data);
        } catch (error) {
          console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                <Geography key={geo.rsmKey} geography={geo} data-tooltip-id = "tooltip" 
                                    onMouseEnter={() => {setContent(geo.properties.name); 
                                    console.log(content)}} 
                                    onMouseLeave={() => {setContent("")}} 
                                    style={{default: { outline: "none" }, hover: { outline: "none" },pressed: { fill: "#F00" }}}/>
                            ))
                            }
                        </Geographies>
                        {responseData? 
                            responseData.map(({id, name, latitude, longitude, amount}) => (
                                <Marker key={id} coordinates={[longitude, latitude]}>
                                    {/* <circle r={1} fill="#F00" strokeWidth={2} style={{hover + }}/>
                                    <text textAnchor="middle" y={-1} style={{display: "none"}}>
                                        {name}
                                    </text> */}
                                    <circle
                                        r={2}
                                        style={{ fill: '#F00', strokeWidth: 2, opacity: amount/10 }}
                                        onMouseEnter={(e) => { e.target.nextSibling.style.visibility = 'visible'; }}
                                        onMouseLeave={(e) => { e.target.nextSibling.style.visibility = 'hidden'; }}
                                    />
                                    <text style={{ textAnchor: 'middle', y: -1, visibility: 'hidden' }}>
                                        {name}
                                    </text>
                                </Marker>
                            ))
                            :
                            <></>
                        }                 
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div>
    );
}

export default Map;
