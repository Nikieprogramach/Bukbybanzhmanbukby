import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import './Menu.css';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="menu" style={{ left: isMenuOpen ? '0' : '-270px' }}>
      <div className="menu-header">
        <div id = "logo" onClick={handleClick}></div>
      </div>
      <SearchBar />
      {/* Other content can go here */}
      <button className={`menu-button ${isMenuOpen ? '' : 'rotate'}`} onClick={toggleMenu} ></button>
    </div>
  );
}

export default Menu;