import React from 'react';
import './FormFieldWrapper.css';

const FormFieldWrapper = ({ label, children, error, className = '' }) => {
    return (
        <div className={`form-field-wrapper ${className}`}>
            {label && <label className="field-label">{label}</label>}
            {children}
            {error && <div className="field-error">{error}</div>}
        </div>
    );
};

export default FormFieldWrapper;
