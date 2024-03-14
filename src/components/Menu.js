import React, { useState, useEffect } from "react";
import SearchBar from './SearchBar';
import './Menu.css';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="menu" style={{ left: isMenuOpen ? '0' : '-270px' }}>
      <div className="menu-header">
        <div id = "logo"  alt="Site Logo"></div>
        {/* <img src="/path/to/home-icon.png" alt="Home Icon" /> */}
      </div>
      <SearchBar />
      {/* Other content can go here */}
      <button className={`menu-button ${isMenuOpen ? '' : 'rotate'}`} onClick={toggleMenu} ></button>
    </div>
  );
}

export default Menu;