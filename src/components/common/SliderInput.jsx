import React from 'react';
import './SliderInput.css';

const SliderInput = ({ value, onChange, min = 0, max = 100, step = 50, labels = [] }) => {
    return (
        <div className="slider-container">
            <input
                type="range"
                className="slider-input"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
            />
            {labels.length > 0 && (
                <div className="slider-labels">
                    {labels.map((label, index) => (
                        <span key={index} className="slider-label">{label}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SliderInput;
