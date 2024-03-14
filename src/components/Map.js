import React, { useState, useEffect } from "react";
import axios from "axios";
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
import "./Map.css";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


const mapWidth = 1060; //941
const mapHeight = 510;

function Map() {
    const [content, setContent] = useState("")
    const [responseData, setResponseData] = useState('');
    const [searchType, setSearchType] = useState('all')
    const [name, setName] = useState('default')
    const [getData, setGetData] = useState(false)

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getFish',{
            params: {
                searchType: "all",
                name: "Teleostei"
              }
          });
          const data = await response.data;
          if(data != []){
            setResponseData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    useEffect(() => {
        if(!getData){
            fetchData();
        }
    }, []);

    return (
        <div className="map-container" style={{height:'100vh', width:'100vw', overflow: 'hidden'}} >
            <ReactTooltip id="tooltip" place="top" content={content}/>
            <div style={{width: "100%"}}>
                <ComposableMap data-tip="" projection="geoMercator" 
                    projectionConfig={{center:[16, -71]}}
                    style={{height:'200vh', width:'150vw', overflow: 'hidden'}}
                    >
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
                                    fill="#2ca2de"
                                    stroke="#000000" 
                                    strokeWidth={0.2}
                                    onMouseLeave={() => {setContent("")}} 
                                    style={{default: { outline: "none" }, 
                                    hover: { outline: "none"},
                                    pressed: { fill: "#F00" }}}
                                    />
                            ))
                            }
                        </Geographies>
                        {responseData && responseData != "Wrong input!"? 
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
