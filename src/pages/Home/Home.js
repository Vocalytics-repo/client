// src/pages/Home/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Refs for animation triggers
    const featureSectionRef = useRef(null);
    const [featureVisible, setFeatureVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    // 스크롤 위치에 따라 요소가 보이는지 확인하는 함수
    const checkVisibility = () => {
        if (featureSectionRef.current) {
            const rect = featureSectionRef.current.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.75;
            setFeatureVisible(isVisible);
            
            // 스크롤이 진행됨에 따라 차례로 기능 카드 활성화
            if (isVisible) {
                const scrollProgress = (window.innerHeight * 0.75 - rect.top) / 100;
                if (scrollProgress > 1 && activeFeature === null) setActiveFeature(0);
                if (scrollProgress > 3 && activeFeature === 0) setActiveFeature(1);
                if (scrollProgress > 5 && activeFeature === 1) setActiveFeature(2);
            }
        }
    };

    // 컴포넌트 마운트시 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);
    }, [activeFeature]);

    // 영역별 배경 스타일
    const sectionBackgroundStyle = {
        position: 'relative',
        overflow: 'hidden',
    };

    // Hero 섹션 스타일
    const heroStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        textAlign: 'center',
        backgroundImage: 'url("/assets/images/home.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...sectionBackgroundStyle,
    };

    const featureImages = [
        "/assets/images/young-writer-taking-notes.jpg",
        "/assets/images/tiping.jpg",
        "/assets/images/speak.png",
    ];

    // 기능 카드 스타일
    const featureCardStyle = index => ({
        width: '280px',
        height: '280px',
        backgroundImage: `url(${featureImages[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        margin: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: activeFeature !== null && activeFeature >= index 
            ? 'translateY(0) scale(1)' 
            : 'translateY(50px) scale(0.9)',
        opacity: activeFeature !== null && activeFeature >= index ? 1 : 0,
    });

    // 버튼 스타일
    const buttonStyle = {
        padding: '12px 24px',
        borderRadius: '6px',
        fontWeight: 'bold',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        marginRight: '10px',
    };

    // 메인 버튼
    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'white',
        color: '#333',
        border: 'none',
    };

    // 보조 버튼
    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'transparent',
        color: 'white',
        border: '2px solid white',
    };

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* Hero 섹션 - 첫 번째 이미지 스타일로 */}
            <section style={heroStyle}>
                <div style={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    padding: '0 20px',
                    borderRadius: '15px',
                    padding: '30px 50px'
                }}>
                    <h1 style={{ 
                        fontSize: '4.5rem', 
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        color: 'white'
                    }}>
                        Vocalytics
                    </h1>
                    <p style={{ 
                        fontSize: '1.8rem', 
                        marginBottom: '40px',
                        color: 'white'
                    }}>
                        "당신의 한국어, 소리로부터 시작됩니다."
                    </p>
                    <div>
                        <Link to="/stt">
                            <button style={primaryButtonStyle}>
                                Get Started
                            </button>
                        </Link>
                        <a href="#features">
                            <button style={secondaryButtonStyle}>
                                Learn More
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* 기능 소개 섹션 - 두 번째와 세 번째 이미지 스타일로 */}
            <section 
                id="features" 
                ref={featureSectionRef}
                style={{
                    minHeight: '100vh',
                    padding: '80px 20px',
                    backgroundColor: 'white',
                    position: 'relative',
                }}
            >
                <div style={{ 
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: featureVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}>
                    {/* 기능 카드 영역 */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginTop: '50px',
                    }}>
                        {/* 한국어 전사 기능 */}
                        <div style={featureCardStyle(0)}>
                        </div>

                        {/* 문법 교정 기능 */}
                        <div style={featureCardStyle(1)}>
                        </div>

                        {/* 발음 교정 기능 */}
                        <div style={featureCardStyle(2)}>
                        </div>
                    </div>

                    {/* 추가 기능 영역 */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        marginTop: '30px',
                        opacity: activeFeature === 2 ? 1 : 0,
                        transform: activeFeature === 2 ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease',
                    }}>
                        <div style={{
                            width: '280px',
                            margin: '15px',
                            textAlign: 'center',
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                한국어 전사기능
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#666' }}>
                                Whisper 모델을 Fine-tune하여 높은 정확도의 한국어 전사 기능을 제공합니다.
                            </p>
                        </div>

                        <div style={{
                            width: '280px',
                            margin: '15px',
                            textAlign: 'center',
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                문법 교정 기능
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#666' }}>
                                한국의 익숙치 않은 문법으로 학습에 어려움을 느끼시는 분들을 위해 텍스트를 기반으로 문맥에 맞지 않는 단어나 문장을 파악하여 교정하는 기능을 제공합니다.
                            </p>
                        </div>

                        <div style={{
                            width: '280px',
                            margin: '15px',
                            textAlign: 'center',
                        }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
                                발음 교정 기능
                            </h3>
                            <p style={{ fontSize: '1rem', color: '#666' }}>
                                한국어 발음이 어려우신가요? Vocalytics에서는 변환된 텍스트를 기반으로 틀린 발음을 올바른 발음으로 바꾸어 TTS로 들려드리는 기능을 제공합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
