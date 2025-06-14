import React from 'react';

const TabNavigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: '📊 전체 개요', icon: '📊' },
        { id: 'gender', label: '👥 성별 분석', icon: '👥' },
        { id: 'nationality', label: '🌍 국적별 분석', icon: '🌍' },
        { id: 'level', label: '📈 레벨별 성과', icon: '📈' },
        { id: 'csid', label: '🔍 CSID 패턴', icon: '🔍' },
        { id: 'type', label: '📝 타입별 성과', icon: '📝' },
        { id: 'text', label: '📚 텍스트 난이도', icon: '📚' }
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
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label.replace(/^[^\s]+ /, '')}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation; 