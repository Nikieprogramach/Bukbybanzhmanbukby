import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
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