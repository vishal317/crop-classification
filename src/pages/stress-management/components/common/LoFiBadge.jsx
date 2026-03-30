import React from 'react';

const LoFiBadge = ({ text, variant = 'default', className = '' }) => {
    let styleClass = '';

    switch (variant) {
        case 'black':
        case 'critical':
        case 'high':
            styleClass = 'black';
            break;
        case 'gray':
        case 'moderate':
            styleClass = 'gray';
            break;
        case 'outline':
        case 'normal':
            styleClass = 'outline';
            break;
        case 'transparent':
            styleClass = 'transparent';
            break;
        default:
            styleClass = 'outline';
    }

    return (
        <span className={`sm-badge ${styleClass} ${className}`}>
            {text}
        </span>
    );
};

export default LoFiBadge;
