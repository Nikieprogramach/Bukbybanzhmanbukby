import React from 'react';
import SearchBar from './SearchBar';
import './Menu.css';

const Menu = () => {
  return (
    <div className="sidebar">
      <SearchBar />
      {/* Other content can go here */}
    </div>
  );
}

export default Menu;