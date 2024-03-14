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
        coordinates: [-160.423092, 20.367763] // flipped cords [East, North]
    }
]
const mapWidth = 1055; //941
const mapHeight = 500;

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
        <div className="map-container" >
            <ReactTooltip id="tooltip" place="top" content={content}/>
            <div style={{width: "100%"}}>
                <ComposableMap data-tip="" projection="geoMercator" 
                    projectionConfig={{center:[-70, 5], scale: 150}}>
                <ZoomableGroup
                    translateExtent={[
                    [0, -mapHeight],
                    [mapWidth, mapHeight]
                    ]} 
                >
                        <Geographies geography="/map.json">
                            {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} data-tooltip-id = "tooltip" 
                                    onMouseEnter={() => {setContent(geo.properties.name); 
                                    console.log(content)}} 
                                    onMouseLeave={() => {setContent("")}} 
                                    style={{default: { outline: "none" }, hover: { outline: "none"},pressed: { fill: "#F00" }}}/>
                            ))
                            }
                        </Geographies>
                        {responseData? 
                            responseData.map(({id, name, latitude, longitude}) => (
                                <Marker key={id} coordinates={[longitude, latitude]}>
                                    <circle r={1} fill="#F00" strokeWidth={2}/>
                                    <h1>{name}</h1>
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
