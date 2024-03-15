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
                                    {/* <circle r={1} fill="#F00" strokeWidth={2} style={{hover + }}/>
                                    <text textAnchor="middle" y={-1} style={{display: "none"}}>
                                        {name}
                                    </text> */}
                                    <circle
                                        r={2}
                                        style={{ fill: 'white', strokeWidth: 2, opacity: amount/10 }}
                                    />
                                    <svg 
                                        width="1200px" 
                                        height="1200px" 
                                        style={{ 
                                            shapeRendering: 'geometricPrecision', 
                                            textRendering: 'geometricPrecision', 
                                            imageRendering: 'optimizeQuality', 
                                            fillRule: 'evenodd', 
                                            clipRule: 'evenodd' 
                                        }}
                                    >
                                    </svg>
                                    <path style={{opacity:"1"}} fill="#fefffe" d="M 573.5,364.5 C 579.699,366.182 585.366,369.015 590.5,373C 610.603,389.104 631.27,404.438 652.5,419C 671.216,431.24 691.55,439.573 713.5,444C 813.835,454.222 912.835,471.889 1010.5,497C 1030.42,502.53 1050.09,508.864 1069.5,516C 1090.14,526.318 1110.8,536.651 1131.5,547C 1142.15,552.976 1151.65,560.476 1160,569.5C 1161.94,573.048 1163.61,576.714 1165,580.5C 1165.65,583.594 1165.32,586.594 1164,589.5C 1161.5,592 1159,594.5 1156.5,597C 1149.08,600.917 1141.41,604.25 1133.5,607C 1135.63,608.103 1137.96,608.603 1140.5,608.5C 1148.11,606.949 1155.77,606.449 1163.5,607C 1167.88,611.466 1168.38,616.299 1165,621.5C 1162.2,625.299 1159.04,628.799 1155.5,632C 1131.17,647.502 1106.5,662.502 1081.5,677C 980.428,730.684 872.595,754.518 758,748.5C 744.941,748.635 731.941,747.969 719,746.5C 704.452,756.865 689.285,766.365 673.5,775C 646.12,792.706 620.787,813.039 597.5,836C 593.376,837.056 589.71,836.222 586.5,833.5C 582.285,827.905 580.285,821.572 580.5,814.5C 582.776,798.183 584.943,781.85 587,765.5C 589.207,754.211 593.373,743.711 599.5,734C 564.729,720.743 529.729,708.076 494.5,696C 459.636,686.534 424.636,677.534 389.5,669C 359.282,661.241 328.615,656.408 297.5,654.5C 283.038,654.83 268.704,656.33 254.5,659C 235.115,665.128 215.782,671.461 196.5,678C 149.979,689.63 103.312,700.63 56.5,711C 47.8333,711.667 39.1667,711.667 30.5,711C 29.376,710.751 28.376,710.251 27.5,709.5C 30.7563,702.141 32.923,694.475 34,686.5C 36.06,681.38 38.3933,676.38 41,671.5C 54.4216,652.324 68.0882,633.324 82,614.5C 86.6444,607.063 89.8111,599.063 91.5,590.5C 90.8282,585.478 89.9949,580.478 89,575.5C 76.4838,550.635 64.6504,525.468 53.5,500C 47.3161,483.73 44.3161,466.897 44.5,449.5C 59.2275,452.687 73.5608,457.187 87.5,463C 139.955,483.894 192.621,504.228 245.5,524C 281.077,532.986 317.077,534.986 353.5,530C 404.447,517.351 455.113,503.684 505.5,489C 524.108,483.278 543.108,479.612 562.5,478C 565.362,477.73 568.028,476.896 570.5,475.5C 567.607,468.482 566.107,461.148 566,453.5C 564.821,425.74 565.821,398.074 569,370.5C 570.332,368.34 571.832,366.34 573.5,364.5 Z M 1045.5,562.5 C 1062.65,561.481 1070.48,569.481 1069,586.5C 1061.63,600.967 1051.13,603.8 1037.5,595C 1028.16,581.186 1030.83,570.353 1045.5,562.5 Z"/>

                                    {/* <path fill="#fefffe" style={{opacity: amount/10}} data-tip={name + " " + amount + " individuals"} d="M 573.5,364.5 C 579.699,366.182 585.366,369.015 590.5,373C 610.603,389.104 631.27,404.438 652.5,419C 671.216,431.24 691.55,439.573 713.5,444C 813.835,454.222 912.835,471.889 1010.5,497C 1030.42,502.53 1050.09,508.864 1069.5,516C 1090.14,526.318 1110.8,536.651 1131.5,547C 1142.15,552.976 1151.65,560.476 1160,569.5C 1161.94,573.048 1163.61,576.714 1165,580.5C 1165.65,583.594 1165.32,586.594 1164,589.5C 1161.5,592 1159,594.5 1156.5,597C 1149.08,600.917 1141.41,604.25 1133.5,607C 1135.63,608.103 1137.96,608.603 1140.5,608.5C 1148.11,606.949 1155.77,606.449 1163.5,607C 1167.88,611.466 1168.38,616.299 1165,621.5C 1162.2,625.299 1159.04,628.799 1155.5,632C 1131.17,647.502 1106.5,662.502 1081.5,677C 980.428,730.684 872.595,754.518 758,748.5C 744.941,748.635 731.941,747.969 719,746.5C 704.452,756.865 689.285,766.365 673.5,775C 646.12,792.706 620.787,813.039 597.5,836C 593.376,837.056 589.71,836.222 586.5,833.5C 582.285,827.905 580.285,821.572 580.5,814.5C 582.776,798.183 584.943,781.85 587,765.5C 589.207,754.211 593.373,743.711 599.5,734C 564.729,720.743 529.729,708.076 494.5,696C 459.636,686.534 424.636,677.534 389.5,669C 359.282,661.241 328.615,656.408 297.5,654.5C 283.038,654.83 268.704,656.33 254.5,659C 235.115,665.128 215.782,671.461 196.5,678C 149.979,689.63 103.312,700.63 56.5,711C 47.8333,711.667 39.1667,711.667 30.5,711C 29.376,710.751 28.376,710.251 27.5,709.5C 30.7563,702.141 32.923,694.475 34,686.5C 36.06,681.38 38.3933,676.38 41,671.5C 54.4216,652.324 68.0882,633.324 82,614.5C 86.6444,607.063 89.8111,599.063 91.5,590.5C 90.8282,585.478 89.9949,580.478 89,575.5C 76.4838,550.635 64.6504,525.468 53.5,500C 47.3161,483.73 44.3161,466.897 44.5,449.5C 59.2275,452.687 73.5608,457.187 87.5,463C 139.955,483.894 192.621,504.228 245.5,524C 281.077,532.986 317.077,534.986 353.5,530C 404.447,517.351 455.113,503.684 505.5,489C 524.108,483.278 543.108,479.612 562.5,478C 565.362,477.73 568.028,476.896 570.5,475.5C 567.607,468.482 566.107,461.148 566,453.5C 564.821,425.74 565.821,398.074 569,370.5C 570.332,368.34 571.832,366.34 573.5,364.5 Z M 1045.5,562.5 C 1062.65,561.481 1070.48,569.481 1069,586.5C 1061.63,600.967 1051.13,603.8 1037.5,595C 1028.16,581.186 1030.83,570.353 1045.5,562.5 Z"/> */}
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

