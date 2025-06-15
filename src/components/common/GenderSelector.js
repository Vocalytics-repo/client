import React from 'react';
import './GenderSelector.css';

const GenderSelector = ({ 
    value = 'female', 
    onChange, 
    disabled = false,
    size = 'medium',
    className = '',
    label = '음성 성별'
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const selectorClasses = [
        'gender-selector',
        `gender-selector--${size}`,
        disabled ? 'gender-selector--disabled' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={selectorClasses}>
            <label htmlFor="gender-select" className="gender-selector__label">
                {label}:
            </label>
            <select 
                id="gender-select"
                value={value} 
                onChange={handleChange}
                disabled={disabled}
                className="gender-selector__select"
            >
                <option value="female">여성</option>
                <option value="male">남성</option>
            </select>
        </div>
    );
};

export default GenderSelector; 