import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => { 
    const navigate = useNavigate();
    const goToMap = () => {
        navigate('/map');
    }
    return (
        <div>
            <h1>Welcome to our app!</h1>
            <button onClick={goToMap} className="button">Go to Map</button>
        </div>
    );
}

export default LandingPage;