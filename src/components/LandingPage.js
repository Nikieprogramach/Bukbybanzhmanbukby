import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

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
              <p>Here's a little something about us...</p>
          </div>
          <div class="team-photos">      
              <div class="team-member">
                  <img src="https://via.placeholder.com/150" alt="Team Member 1"></img>
                  <p>Person 1 Description</p>
              </div>
              <div class="team-member">
                  <img src="https://via.placeholder.com/150" alt="Team Member 2"></img>
                  <p>Person 2 Description</p>
              </div>
              <div class="team-member">
                  <img src="https://via.placeholder.com/150" alt="Team Member 3"></img>
                  <p>Person 3 Description</p>
              </div>
              <div class="team-member">
                  <img src="https://via.placeholder.com/150" alt="Team Member 4"></img>
                  <p>Person 4 Description</p>
              </div>
              <div class="team-member">
                  <img src="https://via.placeholder.com/150" alt="Team Member 5"></img>
                  <p>Person 5 Description</p>
              </div>
            </div>
        </section>
    
        <section class="future-content" id="future-content">
            <h3>Future Plans</h3>
            <p>This section can be used to describe upcoming features, events, or any other future plans related to AquaTracker.</p>
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