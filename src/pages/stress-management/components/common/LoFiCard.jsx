import React from 'react';

const LoFiCard = ({ title, children, className = '', noPadding = false, headerAction }) => {
    return (
        <div className={`sm-card ${className}`}>
            {title && (
                <div className="sm-card-header">
                    <h3>{title}</h3>
                    {headerAction && <div>{headerAction}</div>}
                </div>
            )}
            <div className={noPadding ? 'sm-card-body no-padding' : 'sm-card-body'}>
                {children}
            </div>
        </div>
    );
};

export default LoFiCard;
