import React from 'react';
import './PageHeader.css';

const PageHeader = ({ 
    title, 
    subtitle, 
    icon, 
    className = '',
    actions = null 
}) => {
    return (
        <div className={`common-page-header ${className}`}>
            <div className="common-page-header-content">
                <h1 className="common-page-title">
                    {icon && <span className="common-page-icon">{icon}</span>}
                    {title}
                    {actions && <div className="common-page-actions">{actions}</div>}
                </h1>
                {subtitle && <p className="common-page-subtitle">{subtitle}</p>}
            </div>
        </div>
    );
};

export default PageHeader; 