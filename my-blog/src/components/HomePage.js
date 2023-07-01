import React from 'react';
import homeImage from '../resources/beach.jpeg';
import "./HomePage.css"
function HomePage() {
    return (
        <div className="home-page">
            <img src={homeImage} alt="Home" className="homepageImage" />
            <h1 className="homepageTitle">Step by step, day by day</h1>
        </div>
    );
}

export default HomePage;

