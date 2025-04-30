import React, { useState, useEffect, useRef } from 'react';
import { isElementVisible, calculateScrollProgress } from '../../utils/scrollUtils';
import './FeatureSection.css';

function FeatureSection() {
    // Refs for animation triggers
    const featureSectionRef = useRef(null);
    const [featureVisible, setFeatureVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);

    // 스크롤 위치에 따라 요소가 보이는지 확인하는 함수
    const checkVisibility = () => {
        if (featureSectionRef.current) {
            const isVisible = isElementVisible(featureSectionRef.current);
            setFeatureVisible(isVisible);
            
            // 스크롤이 진행됨에 따라 차례로 기능 카드 활성화
            if (isVisible) {
                const scrollProgress = calculateScrollProgress(featureSectionRef.current, 0.75, 300);
                if (scrollProgress > 0.2 && activeFeature === null) setActiveFeature(0);
                if (scrollProgress > 0.5 && activeFeature === 0) setActiveFeature(1);
                if (scrollProgress > 0.8 && activeFeature === 1) setActiveFeature(2);
            }
        }
    };

    // 컴포넌트 마운트시 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        return () => window.removeEventListener('scroll', checkVisibility);
    }, [activeFeature]);

    const featureImages = [
        "/assets/images/young-writer-taking-notes.jpg",
        "/assets/images/tiping.jpg",
        "/assets/images/speak.png",
    ];

    // 기능 정보
    const featureInfo = [
        {
            title: "한국어 전사 기능",
            description: "Whisper 모델을 Fine-tune하여 높은 정확도의 한국어 전사 기능을 제공합니다."
        },
        {
            title: "문법 교정 기능",
            description: "한국의 익숙치 않은 문법으로 학습에 어려움을 느끼시는 분들을 위해 텍스트를 기반으로 문맥에 맞지 않는 단어나 문장을 파악하여 교정하는 기능을 제공합니다."
        },
        {
            title: "발음 교정 기능",
            description: "한국어 발음이 어려우신가요? Vocalytics에서는 변환된 텍스트를 기반으로 틀린 발음을 올바른 발음으로 바꾸어 TTS로 들려드리는 기능을 제공합니다."
        }
    ];

    return (
        <section 
            id="features" 
            ref={featureSectionRef}
            className={`feature-section ${featureVisible ? 'visible' : ''}`}
        >
            <div className="feature-container">
                {/* 기능 카드 영역 */}
                <div className="feature-cards">
                    {featureImages.map((image, index) => (
                        <div 
                            key={index}
                            className={`feature-card ${activeFeature !== null && activeFeature >= index ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    ))}
                </div>

                {/* 기능 설명 영역 */}
                <div className={`feature-descriptions ${activeFeature === 2 ? 'active' : ''}`}>
                    {featureInfo.map((feature, index) => (
                        <div key={index} className="feature-description">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeatureSection; 