import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
    message = "데이터를 불러오는 중...", 
    size = "medium",
    className = "" 
}) => {
    return (
        <div className={`common-loading-container ${className}`}>
            <div className={`common-loading-spinner ${size}`}></div>
            <p className="common-loading-message">{message}</p>
        </div>
    );
};

export default LoadingSpinner; 