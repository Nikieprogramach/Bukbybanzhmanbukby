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
import Menu from "./Menu";
import "./Map.css";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"


const mapWidth = 1060; //941
const mapHeight = 510;

const fish_species = [
    "Glenoglossa wassi",
    "Hippocampus planifrons",
    "Rhina ancylostomus",
    "Vincentia conspersa",
    "Haemulon vittatum",
    "Laemonema goodebeanorum",
    "Zeugopterus norvegicus",
    "Monotaxis grandoculis",
    "Malacocottus kincaidi",
    "Fusigobius",
    "Hippocampus reidi",
    "Ophisternon gutturale",
    "Sargocentron tiere",
    "Cynoscion nothus",
    "Eviota fallax",
    "Argyripnus ephippiatus",
    "Astronesthinae",
    "Lampris guttatus",
    "Sebastes maliger",
    "Porcostoma dentata",
    "Ctenochaetus flavicauda",
    "Kali macrura",
    "Chironemus georgianus",
    "Hippocampus hippocampus",
    "Echiichthys vipera",
    "Merluccius merluccius",
    "Strongylura scapularis",
    "Serranidae",
    "Bathytoshia centroura",
    "Sebastes chrysomelas",
    "Taeniurops meyeni",
    "Hirundichthys speculiger",
    "Pagetopsis",
    "Rhinobatos lionotus",
    "Gymnothorax zonipectis",
    "Chromis fumea",
    "Gymnothorax fimbriatus",
    "Ogcocephalus nasutus",
    "Aulotrachichthys",
    "Halosaurus carinicauda",
    "Scombrinae",
    "Argentina euchus",
    "Chelidonichthys queketti",
    "Stemonosudis gracilis",
    "Melanocetidae",
    "Batrachomoeus dubius",
    "Chlorophthalmus vityazi",
    "Acentrogobius suluensis",
    "Peristedion thompsoni",
    "Electrona",
    "Bathyraja eatonii",
    "Scopeloberyx robustus",
    "Bathypterois atricolor",
    "Glyptophidium macropus",
    "Chirolophis",
    "Microichthys coccoi",
    "Desmodema polystictum",
    "Kuiterichthys furcipilis",
    "Cleidopus gloriamaris",
    "Cyclichthys orbicularis",
    "Zenion hololepis",
    "Scopelosaurus meadi",
    "Eretmichthys",
    "Gymnoscopelus",
    "Benthosema",
    "Nibea microgenys",
    "Pavoclinus laurentii",
    "Chaetodon decussatus",
    "Prionotus ophryas",
    "Batrichthys apiatus",
    "Uranoscopus archionema",
    "Prognathodes guyanensis",
    "Halieutopsis bathyoreos",
    "Epinephelus tuamotuensis",
    "Lissonanchus lusherae",
    "Coryphaenoides ariommus",
    "Remora osteochir",
    "Cologrammus flavescens",
    "Thysanophrys",
    "Apogonichthys perdix",
    "Bathymicrops regis",
    "Sebastes constellatus",
    "Coelorinchus pardus",
    "Chlidichthys inornatus",
    "Pseudobathylagus milleri",
    "Epinephelus trimaculatus",
    "Gordiichthys leibyi",
    "Favonigobius lateralis",
    "Pagellus",
    "Citharichthys gymnorhinus",
    "Vinciguerria mabahiss",
    "Engyprosopon mogkii",
    "Cebidichthys violaceus",
    "Chlorophthalmus borealis",
    "Careproctus roseofuscus",
    "Bellator brachychir",
    "Prionurus punctatus",
    "Atherinomorus forskalii",
    "Pholis schultzi",
    "Brephostoma carpenteri",
    "Dermogenys",
    "Barbodes",
    "Diceratias pileatus",
    "Acanthocepola limbata",
    "Pycnochromis acares",
    "Synbranchidae",
    "Pseudamiops diaphanes",
    "Oxyurichthys lonchotus",
    "Apterichtus australis",
    "Lophius vaillanti",
    "Chaetodon paucifasciatus",
    "Ocosia fasciata",
    "Ptarmus gallus",
    "Parapercis aurantiaca",
    "Lophiodes spilurus",
    "Paraconger caudilimbatus",
    "Sphagemacrurus decimalis",
    "Neobythites nigriventris",
    "Phyllopteryx",
    "Parupeneus chrysonemus",
    "Centrophorus uyato",
    "Doryrhamphus negrosensis negrosensis",
    "Parablennius cyclops",
    "Syngnathus macrobrachium",
    "Scopeloberyx rubriventer",
    "Liparis megacephalus",
    "Cymbacephalus",
    "Dasyscopelus obtusirostris",
    "Encheliophis homei",
    "Nandus nandus",
    "Chauliodus pammelas",
    "Dialommus fuscus",
    "Pterygotrigla macrorhynchus",
    "Pomacentrus burroughi",
    "Cyclopterinae",
    "Zesticelus ochotensis"
]

function Map() {
    const [content, setContent] = useState(null)
    const [responseData, setResponseData] = useState('');
    const [shipData, setShipData] = useState('');
    const [searchType, setSearchType] = useState('byName')
    const [name, setName] = useState('Hippocampus reidi')
    const [getData, setGetData] = useState(false)
    const [input, setInput] = useState("")

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getFish',{
            params: {
                searchType: searchType,
                name: name
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

    const getShipInfo = async () => {
        try {
          const response = await axios.get('http://localhost:5000/getShips',{
            params: {
                searchType: searchType,
                name: name
              }
          });
          const data = await response.data;
          if(data != []){
            setShipData(data);
          }
        } catch (error) {
          console.error('Error:', error);
        }
    };

    useEffect(() => {
        if(!getData){
            fetchData();
            // getShipInfo()
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Call your function here
          getShipInfo();
        }, 500); // 3000 milliseconds = 3 seconds
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
      }, []);

    const handleChange = (data) => {
        // Pass the data back to the parent component using the callback function
        if(data){
            setInput(data);
            if(fish_species.includes(input)){
                setName(input)
            }
        }
    };

    const triggerSearch = () => {
        // setName(input)
        console.log(name)
        fetchData()
    }

    return (
        <div>
        <Menu dataPass2={handleChange} triggerSearch2={() =>  triggerSearch()}/> 
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
                                onMouseEnter={() => {setContent(geo.properties.name)}} 
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
                                        <circle
                                            r={0.5}
                                            transform="translate(1.5, -0.3)"
                                            style={{ fill: 'white', strokeWidth: 2, opacity: amount/10 }}                     
                                        />         
                                        <path
                                            fill="whitesmoke"
                                            stroke="white"
                                            strokeWidth="0.4"
                                            transform="translate(-3.5, -3.5), scale(0.3)"
                                            style={{opacity: amount/10}}
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M3.75 6.43945L8.26473 10.9542C8.33699 10.8877 8.41559 10.8161 8.49998 10.74C8.97782 10.3091 9.6451 9.73284 10.3998 9.15472C11.1518 8.57866 12.006 7.9889 12.8565 7.53996C13.6889 7.10063 14.6021 6.75011 15.45 6.75011C18.4689 6.75011 21 9.05576 21 12.0001C21 14.9445 18.4689 17.2501 15.45 17.2501C14.6021 17.2501 13.6889 16.8996 12.8565 16.4603C12.006 16.0113 11.1518 15.4216 10.3998 14.8455C9.6451 14.2674 8.97782 13.6911 8.49998 13.2603C8.41559 13.1842 8.33699 13.1125 8.26473 13.046L3.75 17.5608V6.43945ZM9.34352 12.0001C9.39427 11.9537 9.44797 11.9049 9.50444 11.854C9.96238 11.4411 10.598 10.8924 11.312 10.3455C12.0286 9.79657 12.8087 9.26132 13.5567 8.86651C14.3229 8.46209 14.9725 8.25011 15.45 8.25011C17.7331 8.25011 19.5 9.97391 19.5 12.0001C19.5 14.0263 17.7331 15.7501 15.45 15.7501C14.9725 15.7501 14.3229 15.5381 13.5567 15.1337C12.8087 14.7389 12.0286 14.2037 11.312 13.6547C10.598 13.1078 9.96238 12.5591 9.50444 12.1462C9.44797 12.0953 9.39427 12.0465 9.34352 12.0001ZM7.18934 12.0001L5.25 10.0608V13.9395L7.18934 12.0001Z"
                                        />
                                </Marker>
                            ))
                            :
                            <></>
                        }
                        {shipData && shipData != "Wrong input!"? 
                            shipData.map(({ShipId, Latitude, Longitude}) => (
                                <Marker key={ShipId} coordinates={[Longitude, Latitude]}>
                                    <path 
                                        fill="none" 
                                        d="M4 17.5L3 12L12 9L21 12L20 17.5M5 11.3333V7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V11.3333M10 5V3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5M2 21C3 22 6 22 8 20C10 22 14 22 16 20C18 22 21 22 22 21" 
                                        stroke="#ff0004"
                                        stroke-width="1" 
                                        transform="translate(-3.6, -3.5), scale(0.3)"
                                    />
                                </Marker>
                            ))
                            :
                            <></>
                        }                     
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div>
        </div>
    );
}

export default Map;