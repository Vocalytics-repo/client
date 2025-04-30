import React from 'react';
import './ActionButton.css';

const ActionButton = ({ 
    onClick, 
    disabled, 
    variant = 'primary', 
    children 
}) => {
    return (
        <button 
            className={`action-button ${variant}-button`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default ActionButton; 