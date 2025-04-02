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
                                    STT 서비스
                                </Link>
                            </li>
                            <li>
                                <Link to="/proverb" onClick={toggleMenu}>
                                    속담 학습
                                </Link>
                            </li>
                            {/* 필요에 따라 메뉴 항목 추가 */}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default SidebarMenu;
