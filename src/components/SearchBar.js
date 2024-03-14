import React, { useState } from 'react';
import './SearchBar.css';

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

const SearchBar = ({dataPass1, triggerSearch1}) => {
  const [data, setData] = useState('')

  const handleChange = (event) => {
    const newData = event.target.value;
    setData(newData);
    // Pass the data back to the parent component using the callback function
    dataPass1(newData);
};

  const handleClick = () => {
    triggerSearch1();
  }
  return (
    <div class = "search-menu">
      <div className="search-bar">
        <input type="text" id="fishSpecies"  placeholder="Search..." list='fishSpeciesList' onChange={handleChange}/>
        <datalist id="fishSpeciesList">
          {fish_species.map((species, index) => (
            <option key={index} value={species} />
          ))}
        </datalist>
      </div>
      <button id="search-button" onClick={handleClick}></button>
    </div>
  );
}

export default SearchBar;

// import React, { useState } from 'react';

// function SearchBar({ onSearch }) {
//   const [query, setQuery] = useState('');

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onSearch(query); // Pass the query up to the parent component or use it to query a backend API
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={query}
//         onChange={handleChange}
//         placeholder="Search here..."
//         required
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// }

// export default SearchBar;