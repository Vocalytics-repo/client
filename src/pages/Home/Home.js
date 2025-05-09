// src/pages/Home/Home.js
import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <HeroSection />
            <FeatureSection />
        </div>
    );
};

export default Home;