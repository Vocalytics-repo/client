import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { 
            id: 'overview', 
            label: '전체 개요', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13C6.6 5 17.4 5 21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 20L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 17L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        { 
            id: 'gender', 
            label: '성별에 따른 발음 분석', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 3.13A4 4 0 0 1 16 10.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 21V19C21 16.9 19.9 15.1 18.3 14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        { 
            id: 'level', 
            label: '한국어 수준별 분석', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3V21L7 17H21V3H3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M7 8H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        { 
            id: 'csid', 
            label: 'CSID 패턴', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M11 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        { 
            id: 'type', 
            label: '타입별 성과', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        },
        { 
            id: 'text', 
            label: '발음 난이도 분석', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 11H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 15H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            )
        }
    ];

    return (
        <div className="tab-navigation">
            <div className="tab-container">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <div className="tab-icon">{tab.icon}</div>
                        <span className="tab-label">{tab.label}</span>
                        <div className="tab-indicator"></div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation; 