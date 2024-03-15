import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";
import Buki from '../images/Buki.jpg';
import Gab from '../images/Gab.jpg';
import Belich from '../images/Belich.jpg';
import Kris from '../images/Kris.jpg';
import Nikola from '../images/Nikola.jpg';


const LandingPage = () => { 
    const navigate = useNavigate();
    const goToMap = () => {
        navigate('/map');
    }
    function smoothScrollToAboutUs(event) {
        event.preventDefault();
        document.getElementById('about-us-section').scrollIntoView({ behavior: 'smooth' });
    }

    function smoothScrollToFutureChanges(event) {
        event.preventDefault();
        document.getElementById('future-content').scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <div id ="background">
        <nav class="navigation">
            <div class="nav-item">
                <a onClick={goToMap}>Map</a>
            </div>
            <div class="nav-item">
                <a href="#about-us-section" onClick={smoothScrollToAboutUs}>About us</a>
            </div>
            <div class="nav-item">
                <a href="#future-content" onClick={smoothScrollToFutureChanges}>Future Changes</a>
            </div>
        </nav>
    
        <section class="header">
            <div class="text-box">
                <h1>AquaTracker</h1>
                <p>Preserving Tomorrow's Seas Today</p>
                <a onClick={goToMap} class="hero-btn">Check the map</a>
            </div>
        </section>
    
        <section class="about-us" id="about-us-section">
          <div class="about-content">
              <b><h2>About Us</h2>
              </b>
              <p>Our project is a comprehensive initiative aimed at tracking marine life worldwide, monitoring fishing activities, and actively participating in the preservation of endangered species. Through a combination of advanced technology and collaborative efforts, our system provides data on marine biodiversity, fishing vessel movements, and crucial information for sustainable fisheries management. </p>
          </div>
          <div class="team-photos">      
              <div class="team-member">
                  <img src = {Buki} alt="Team Member 1"></img>
                  <p>Bilyan Kostadinov</p>
              </div>
              <div class="team-member">
                  <img src={Gab} alt="Team Member 2"></img>
                  <p>Gabriel Petrov</p>
              </div>
              <div class="team-member">
                  <img src={Kris} alt="Team Member 3"></img>
                  <p>Kristyan Kirilov</p>
              </div>
              <div class="team-member">
                  <img src={Nikola} alt="Team Member 4"></img>
                  <p>Nikola Aleksov</p>
              </div>
              <div class="team-member">
                  <img src={Belich} alt="Team Member 5"></img>
                  <p>Boris Belichev</p>
              </div>
            </div>
        </section>
    
        <section class="future-content" id="future-content">
            <h3>Future Plans</h3>
            <p>In addition to our current initiatives, we are exploring several future plans to further enhance our capabilities in marine conservation and sustainability. These include: tectoning activity monitoring, sattelite ship tracking, sea junk detection, illegal fishing detection etc.</p>
        </section>
    
        <footer class="contact-info">
            <p>Contact Us: contact@example.com</p>
            <p>Follow Us: [Social Media Links]</p>
            <p>&copy; 2024 AquaTracker. All rights reserved.</p>
        </footer>
    </div>   
    );
}

export default LandingPage;