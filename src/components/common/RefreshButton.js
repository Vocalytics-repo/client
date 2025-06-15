import React, { useState } from 'react';
import './RefreshButton.css';

const RefreshButton = ({ onRefresh, loading = false, className = '' }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = async () => {
        if (loading || isAnimating) return;
        
        setIsAnimating(true);
        
        try {
            await onRefresh();
        } finally {
            // 애니메이션이 완료된 후 상태 리셋
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        }
    };

    return (
        <button 
            className={`refresh-button ${isAnimating ? 'animating' : ''} ${loading ? 'loading' : ''} ${className}`}
            onClick={handleClick}
            disabled={loading || isAnimating}
            title="데이터 새로고침"
        >
            <div className="refresh-icon">
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M4 4V9H4.58152M4.58152 9C5.24618 7.35817 6.43236 5.9735 7.96033 5.08493C9.4883 4.19635 11.2680 3.8577 13.033 4.12624C14.798 4.39478 16.4306 5.25413 17.6132 6.5644C18.7958 7.87467 19.4555 9.54613 19.4808 11.2808M4.58152 9H9M20 20V15H19.4185M19.4185 15C18.7538 16.6418 17.5676 18.0265 16.0397 18.9151C14.5117 19.8036 12.732 20.1423 10.967 19.8738C9.20197 19.6052 7.56943 18.7459 6.38683 17.4356C5.20423 16.1253 4.54451 14.4539 4.51918 12.7192M19.4185 15H15" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span className="refresh-text">새로고침</span>
            <div className="refresh-ripple"></div>
        </button>
    );
};

export default RefreshButton; 