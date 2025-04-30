// src/components/Sidebar/SidebarMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SidebarMenu.css';

function SidebarMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // 햄버거 버튼 또는 닫기 버튼 클릭 시 열림/닫힘 토글
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* 햄버거 버튼 */}
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* 사이드바 */}
            <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    {/* 닫기 버튼 */}
                    <button className="close-btn" onClick={toggleMenu}>
                        &times;
                    </button>

                    {/* 로고 */}
                    <div className="sidebar-logo">
                        <h2>Vocalytics</h2>
                        <p>당신의 한국어 학습을 위한 서비스</p>
                    </div>

                    {/* 메뉴 항목들 */}
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" onClick={toggleMenu}>
                                    홈
                                </Link>
                            </li>
                            <li>
                                <Link to="/stt" onClick={toggleMenu}>
                                    음성 인식 서비스
                                </Link>
                            </li>
                            <li>
                                <Link to="/grammar" onClick={toggleMenu}>
                                    문법 교정
                                </Link>
                            </li>
                            <li>
                                <Link to="/pronunciation" onClick={toggleMenu}>
                                    발음 교정
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* 하단 정보 */}
                    <div className="sidebar-footer">
                        <p>© 2025 Vocalytics</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarMenu;
