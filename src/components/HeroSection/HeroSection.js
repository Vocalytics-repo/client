import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToElement } from '../../utils/scrollUtils';
import './HeroSection.css';

function HeroSection() {
    // 특정 요소로 스크롤하는 함수
    const handleScrollToFeatures = (e) => {
        e.preventDefault();
        scrollToElement('features');
    };

    return (
        <section className="hero-section" style={{ backgroundImage: 'url("/assets/images/home.jpg")' }}>
            <div className="hero-content">
                <h1 className="hero-title">Vocalytics</h1>
                <p className="hero-subtitle">
                    "당신의 한국어, 소리로부터 시작됩니다."
                </p>
                <div className="hero-buttons">
                    <Link to="/stt">
                        <button className="button primary-button">
                            Get Started
                        </button>
                    </Link>
                    <a href="#features" onClick={handleScrollToFeatures}>
                        <button className="button secondary-button">
                            Learn More
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection; 