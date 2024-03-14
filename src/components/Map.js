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
import divaRiba from './ribasigma.png';

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
    const [content, setContent] = useState("")
    const [responseData, setResponseData] = useState('');
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

    useEffect(() => {
        if(!getData){
            fetchData();
        }
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
                                    {/* <circle r={1} fill="#F00" strokeWidth={2} style={{hover + }}/>
                                    <text textAnchor="middle" y={-1} style={{display: "none"}}>
                                        {name}
                                    </text> */}
                                    <circle
                                        r={2}
                                        style={{ fill: 'white', strokeWidth: 2, opacity: amount/10 }}
                                    />
                                    {/* <text style={{ textAnchor: 'middle', y: -1, visibility: 'hidden' }}>
                                        {name}
                                    </text> */}
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


// const AISSTREAM_API_KEY = "0415ae3574e33ea295e648ce930f035e0a22620f"
// const socket = new WebSocket("wss://stream.aisstream.io/v0/stream");
// const API_KEY = process.env.AISSTREAM_API_KEY; //Would need to be established first
// socket.addEventListener("open", (_) => {
//   const subscriptionMessage = {
//     APIkey: API_KEY,
//     BoundingBoxes: [
//       [
//         [-180, -90],
//         [180, 90],
//       ],
//     ],
//   };
//   console.log(JSON.stringify(subscriptionMessage));
//   socket.send(JSON.stringify(subscriptionMessage));
// });

// socket.addEventListener("error", (event) => {
//   console.log(event);
// });

// socket.addEventListener("message", (event) => {
//   let aisMessage = JSON.parse(event.data);
//   if (aisMessage["MessageType"] === "PositionReport") {
//     let positionReport = aisMessage["Message"]["PositionReport"];
//     console.log(
//       `ShipId: ${positionReport["UserID"]} Latitude: ${positionReport["Latitude"]} Longitude: ${positionReport["Longitude"]}`
//     );
//   }
// });

