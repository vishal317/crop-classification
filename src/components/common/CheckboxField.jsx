import React from 'react';
import './CheckboxField.css';

const CheckboxField = ({ checked, onChange, label }) => {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                className="checkbox-input"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className="checkbox-label">{label}</span>
        </label>
    );
};

export default CheckboxField;
