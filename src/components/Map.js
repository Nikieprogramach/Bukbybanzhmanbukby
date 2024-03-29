import React, { useState, useEffect, useRef } from "react";
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
    "Zesticelus ochotensis",
    "Actinopteri",
    "Elasmobranchii",
    "Teleostei"
]

const endangered_fish_species = [
    "Ophisternon gutturale",
    "Sebastes chrysomelas",
    "Citharichthys gymnorhinus",
    "Hippocampus hippocampus",
    "Favonigobius lateralis",
    "Sargocentron tiere",
    "Hippocampus planifrons",
    "Chironemus georgianus",
    "Porcostoma dentata",
    "Acanthocepola limbata",
    "Malacocottus kincaidi"
]

function Map() {
    const [content, setContent] = useState(null)
    const [responseData, setResponseData] = useState('');
    const [shipData, setShipData] = useState('');
    const [searchType, setSearchType] = useState('all')
    const [name, setName] = useState('Teleostei')
    const [getData, setGetData] = useState(false)
    const [input, setInput] = useState("")
    const [searchTypeInput, setSearchTypeInput] = useState("")

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [infoPopup, setInfoPopup] = useState();

    const [fishFound, setFishFound] = useState([])

    const [warningMessages, setWarningMessages] = useState([])
    const [showMessages, setShowMessages] = useState(false)

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



    const handleChange = (data, mode) => {
        // Pass the data back to the parent component using the callback function
        if(data){
            setInput(data);
            if(fish_species.includes(input)){
                setName(input)
            }
        }
        if(mode){
            setSearchTypeInput(mode);
            setSearchType(mode)
        }
    };

    const triggerSearch = () => {
        // setName(input)
        console.log(name)
        fetchData()
    }

    const shipInfo = (name, latitude, longitude, id) => {
        const fishInArea = checkForFishInRegion(latitude,longitude)
        let totalAmountOfNearbyFish = 0
        fishInArea.map((item) => {
            totalAmountOfNearbyFish += Number(item['amount'])
        })
        let hasEndangeredSpeciesInProximity = false
        let EndangeredSpeciesInProximity = []
        fishInArea.map((fish) => {
            endangered_fish_species.map((end_fish) => {
                if(fish['name'] == end_fish){
                    hasEndangeredSpeciesInProximity = true
                    EndangeredSpeciesInProximity = [...EndangeredSpeciesInProximity, end_fish]
                }
            })
        })
        setInfoPopup({"name": name, "latitude": latitude, "longitude": longitude, "id": id, "fishInArea": fishInArea, "totalAmountOfFish": totalAmountOfNearbyFish, "hasEndangeredSpeciesInProximity": hasEndangeredSpeciesInProximity, "EndangeredSpeciesInProximity": EndangeredSpeciesInProximity})
        setIsPopupOpen(true);
        // console.log(name, latitude, longitude, id)
    }

    const checkForFishInRegion = (latitude, longitude) => {
        let arr = []
        responseData.map((item)=>{
            if(item['latitude'] >= latitude - 1 && item['longitude'] >= longitude - 1 && item['latitude'] <= latitude + 1 && item['longitude'] <= longitude + 1){
                // setFishFound(prevArr => [...prevArr, {"name": item['name'], "amount": item['amount']}])
                //setFishFound([...fishFound, {"name": item['name'], "amount": item['amount']}])
                
                arr = [...arr, {"name": item['name'], "amount": Number(item['amount'])}]
                // console.log(arr)
            }
        })
        //console.log(arr)
        let refinedArr = []
        arr.map((item) => {
            if(refinedArr.length == 0){
                refinedArr = [...refinedArr, item]
            }else{
                let alreadyInArr = false
                refinedArr.map((arrItem) => {
                    if(arrItem['name'] == item['name']){
                        arrItem['amount'] += 1
                        alreadyInArr = true
                    }
                })
                if(!alreadyInArr){
                    refinedArr = [...refinedArr, item]
                }
            }
        })       
        return refinedArr
    }

    const checkForEndangeredFish = (latitude, longitude, name) => {
        let arr = []
        responseData.map((item)=>{
            if(item['latitude'] >= latitude - 1 && item['longitude'] >= longitude - 1 && item['latitude'] <= latitude + 1 && item['longitude'] <= longitude + 1){
                // setFishFound(prevArr => [...prevArr, {"name": item['name'], "amount": item['amount']}])
                //setFishFound([...fishFound, {"name": item['name'], "amount": item['amount']}])
                
                arr = [...arr, {"name": item['name'], "amount": Number(item['amount'])}]
                // console.log(arr)
            }
        })
        //console.log(arr)
        let refinedArr = []
        arr.map((item) => {
            if(refinedArr.length == 0){
                refinedArr = [...refinedArr, item]
            }else{
                let alreadyInArr = false
                refinedArr.map((arrItem) => {
                    if(arrItem['name'] == item['name']){
                        arrItem['amount'] += 1
                        alreadyInArr = true
                    }
                })
                if(!alreadyInArr){
                    refinedArr = [...refinedArr, item]
                }
            }
        })
        let hasEndangeredSpeciesInProximity = false  
        refinedArr.map((fish) => {
            endangered_fish_species.map((end_fish) => {
                if(fish['name'] == end_fish){
                    hasEndangeredSpeciesInProximity = true
                }
            })
        })    
        if(hasEndangeredSpeciesInProximity){
            let message = `Ship ${name} is in an area with endangered species!`
            console.log(message)
            // if(!warningMessages){
            //     setWarningMessages([...warningMessages, message])
            // }else
            if(!warningMessages.includes(message)){
                setWarningMessages([...warningMessages, message])
            }
        // }else{
        //     if(!warningMessages.includes(`Ship ${name} is in an area with endangered species!`)){
        //         setWarningMessages(warningMessages.pop(`Ship ${name} is in an area with endangered species!`))
        //     }
        }
        return hasEndangeredSpeciesInProximity
    }

    const chackIfFishIsEnd = (fishName) => {
        return endangered_fish_species.includes(fishName)
    }


    return (
        <div>
        {isPopupOpen && (
            <div className="popup">
                <div>
                    <h2>{infoPopup['name']}</h2>                    
                    <p style={{marginBottom: "5px"}}>MMSI (ID): {infoPopup['id']}</p>
                    <h3>Coordinates:</h3>
                    <p>   &nbsp; Latitude: <br></br> &nbsp; &nbsp; &nbsp; &nbsp;{infoPopup['latitude']}</p>
                    <p>   &nbsp; Longitude: <br></br>  &nbsp; &nbsp; &nbsp; &nbsp;{infoPopup['longitude']}</p>
                    {infoPopup['fishInArea'].length > 0 ? 
                        <h3 style={{marginBottom: "5px", marginTop: "5px"}}>Fish in area:</h3>
                    :
                        <></>
                    }
                    
                    <div className="scrollable-div" style={{maxHeight: "100px", overflow: "hidden", overflowY: "auto", marginBottom: "5px"}}>
                        {
                            infoPopup['fishInArea'].map((fish) => {
                                return(<p>-{fish['name']}: {((fish['amount']/infoPopup['totalAmountOfFish']) * 100).toFixed(2)}%</p>)
                            })
                        }
                    </div>
                    <div>
                        {infoPopup['hasEndangeredSpeciesInProximity'] ? 
                            <div style={{color: "red"}}>
                                <h2 >Warning!</h2>
                                {infoPopup['EndangeredSpeciesInProximity'].map((end_fish) => {
                                    return(
                                        <p><strong>-{end_fish}</strong> is endangered</p>
                                    )
                                })}
                            </div>
                        :
                        <div style={{color: "#34eb77"}}>
                            <h2 >Safe to fish!</h2>
                        </div>
                        }
                    </div>
                </div>
                <button onClick={() => setIsPopupOpen(false)}> <span aria-hidden="true">&times;</span></button>

            </div>
        )}
        <div style={{top:"20px", right:"20px", position: "fixed", zIndex: "10000"}}>
            <div className="bellIcon" style={{top:"20px", right:"20px", position: "fixed", width: "30px", height: "30px", zIndex: "10000", color: "white"}}>
                <svg style={{fill: "white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" onClick={() => setShowMessages(!showMessages)}><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                <p style={{position: "fixed", top:"40px", right:"15px", backgroundColor: "red", width: "20px", height: "20px", alignItems: 'center', display: "flex", justifyContent: "center", borderRadius:"10px"}}>{warningMessages.length}</p>
            </div>
            <div style={{width: "300px", marginTop: '40px'}}>
                {showMessages?
                    <div>
                        {warningMessages.map((message, index) => {
                            return(
                                <div key={index} style={{color: "red", backgroundColor: 'rgba(0,0,0,.7)', margin: "2px 2px 2px 2px", padding:"5px 5px 5px 5px", border: "1px solid black", borderRadius:"10px", height: "50px"}}>{message}</div>
                            )
                        })}
                    </div>
                :
                    <></>
                }
            </div>
        </div>
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
                                    {chackIfFishIsEnd(name) ?
                                        <path
                                            fill="red"
                                            stroke="#02283B"
                                            strokeWidth="20"
                                            transform="translate(-1.1, -1), scale(0.005)"
                                            style={{opacity: amount/5}}
                                            d="M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"
                                        />
                                    :
                                        <path
                                            fill="white"
                                            stroke="#02283B"
                                            strokeWidth="20"
                                            transform="translate(-1.1, -1), scale(0.005)"
                                            style={{opacity: amount/5}}
                                            d="M327.1 96c-89.97 0-168.54 54.77-212.27 101.63L27.5 131.58c-12.13-9.18-30.24.6-27.14 14.66L24.54 256 .35 365.77c-3.1 14.06 15.01 23.83 27.14 14.66l87.33-66.05C158.55 361.23 237.13 416 327.1 416 464.56 416 576 288 576 256S464.56 96 327.1 96zm87.43 184c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24 0 13.25-10.75 24-24 24z"
                                        />
                                    }        

                                </Marker>
                            ))
                            :
                            <></>
                        }
                        {shipData && shipData != "Wrong input!"? 
                            shipData.map(({ShipID, Latitude, Longitude, Name}) => (
                                <Marker  key={ShipID} coordinates={[Longitude, Latitude]}>
                                    {checkForEndangeredFish(Latitude, Longitude, Name) ?
                                        <path 
                                            fill="red" 
                                            d="M16.997 20c-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.446.676-3.125 1.22-.587.469-.975.78-1.874.78-.897 0-1.285-.311-1.872-.78C4.444 18.676 3.601 18 2 18v2c.898 0 1.286.311 1.873.78.679.544 1.523 1.22 3.122 1.22 1.601 0 2.445-.676 3.124-1.219.588-.47.976-.781 1.875-.781.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219s2.446-.676 3.125-1.219C20.689 20.328 21.1 20 22 20v-2c-1.602 0-2.447.676-3.127 1.219-.588.47-.977.781-1.876.781zM6 8.5 4 9l2 8h.995c1.601 0 2.445-.676 3.124-1.219.588-.47.976-.781 1.875-.781.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219H18l.027-.107.313-1.252L20 9l-2-.5V5.001a1 1 0 0 0-.804-.981L13 3.181V2h-2v1.181l-4.196.839A1 1 0 0 0 6 5.001V8.5zm2-2.681 4-.8 4 .8V8l-4-1-4 1V5.819z" 
                                            stroke="#ff0004"
                                            stroke-width="0.001" 
                                            transform="translate(-1.2, -1.2), scale(0.2)"
                                            onClick={() => {shipInfo(Name, Latitude, Longitude, ShipID)}}
                                        />
                                        :
                                        <path 
                                            fill="#34eb77" 
                                            d="M16.997 20c-.899 0-1.288-.311-1.876-.781-.68-.543-1.525-1.219-3.127-1.219-1.601 0-2.446.676-3.125 1.22-.587.469-.975.78-1.874.78-.897 0-1.285-.311-1.872-.78C4.444 18.676 3.601 18 2 18v2c.898 0 1.286.311 1.873.78.679.544 1.523 1.22 3.122 1.22 1.601 0 2.445-.676 3.124-1.219.588-.47.976-.781 1.875-.781.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219s2.446-.676 3.125-1.219C20.689 20.328 21.1 20 22 20v-2c-1.602 0-2.447.676-3.127 1.219-.588.47-.977.781-1.876.781zM6 8.5 4 9l2 8h.995c1.601 0 2.445-.676 3.124-1.219.588-.47.976-.781 1.875-.781.9 0 1.311.328 1.878.781.679.543 1.524 1.219 3.125 1.219H18l.027-.107.313-1.252L20 9l-2-.5V5.001a1 1 0 0 0-.804-.981L13 3.181V2h-2v1.181l-4.196.839A1 1 0 0 0 6 5.001V8.5zm2-2.681 4-.8 4 .8V8l-4-1-4 1V5.819z" 
                                            stroke="#ff0004"
                                            stroke-width="0.001" 
                                            transform="translate(-1.2, -1.2), scale(0.2)"
                                            onClick={() => {shipInfo(Name, Latitude, Longitude, ShipID)}}
                                        />                                        
                                    }

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