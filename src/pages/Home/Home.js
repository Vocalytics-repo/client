// src/pages/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section
                className="hero-section"
                style={{
                    backgroundImage: "url('/images/hero-background.jpg')", // 배경 이미지 경로를 실제 파일 위치로 수정하세요.
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    padding: '100px 20px',
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <h1>Vocalytics</h1>
                <p style={{ fontSize: '1.5rem', margin: '20px 0' }}>
                    "당신의 한국어, 소리로부터 시작됩니다."
                </p>
                <Link to="/stt">
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '1.2rem',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        지금 시작하기
                    </button>
                </Link>
            </section>

            {/* 기능 소개 섹션 */}
            <section
                className="features-section"
                style={{ padding: '50px 20px', textAlign: 'center' }}
            >
                <h2>주요 기능</h2>
                <div
                    className="features-cards"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '20px',
                        marginTop: '30px',
                    }}
                >
                    <div
                        className="feature-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <div className="icon" style={{ fontSize: '40px' }}>
                            📢
                        </div>
                        <h3>음성을 텍스트로</h3>
                        <p>실시간 한국어 전사</p>
                    </div>
                    <div
                        className="feature-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <div className="icon" style={{ fontSize: '40px' }}>
                            🎧
                        </div>
                        <h3>발음 교정</h3>
                        <p>올바른 발음을 듣고 교정하세요</p>
                    </div>
                    <div
                        className="feature-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <div className="icon" style={{ fontSize: '40px' }}>
                            📚
                        </div>
                        <h3>속담 학습</h3>
                        <p>속담을 통해 한국 문화를 배워보세요</p>
                    </div>
                    <div
                        className="feature-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <div className="icon" style={{ fontSize: '40px' }}>
                            📝
                        </div>
                        <h3>요약</h3>
                        <p>텍스트 요약 기능 제공</p>
                    </div>
                    <div
                        className="feature-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '200px',
                        }}
                    >
                        <div className="icon" style={{ fontSize: '40px' }}>
                            🌐
                        </div>
                        <h3>번역</h3>
                        <p>다국어 번역 기능 제공</p>
                    </div>
                </div>
            </section>

            {/* 타겟 사용자 안내 섹션 */}
            <section
                className="target-users-section"
                style={{ padding: '50px 20px', textAlign: 'center' }}
            >
                <h2>타겟 사용자</h2>
                <p style={{ margin: '20px 0' }}>
                    외국인 유학생, 한류 팬, 한국어 학습자를 위한 맞춤형 서비스
                </p>
                <div
                    className="users-images"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* 실제 이미지 경로로 수정하세요 */}
                    <img
                        src="/images/avatar1.png"
                        alt="User 1"
                        style={{ width: '100px', borderRadius: '50%' }}
                    />
                    <img
                        src="/images/avatar2.png"
                        alt="User 2"
                        style={{ width: '100px', borderRadius: '50%' }}
                    />
                    <img
                        src="/images/avatar3.png"
                        alt="User 3"
                        style={{ width: '100px', borderRadius: '50%' }}
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;
