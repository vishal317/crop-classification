import React from 'react';
import { ChevronDown, Search } from 'lucide-react';
import './DynamicSelect.css';

const DynamicSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "SELECT TYPE...",
    disabled = false,
    loading = false,
    isSearchable = false,
    icon,
    helperBadge
}) => {
    return (
        <div className="dynamic-select-wrapper">
            <div className="dynamic-select-container">
                {isSearchable ? (
                    <>
                        <span className="search-icon-small">
                            {icon || <Search size={14} strokeWidth={3} />}
                        </span>
                        <input
                            type="text"
                            className="searchable-input"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            disabled={disabled}
                        />
                    </>
                ) : (
                    <>
                        <select
                            className="select-input"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={disabled || loading}
                        >
                            <option value="" disabled hidden>{placeholder}</option>
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <div className="select-arrow">
                            <ChevronDown size={18} />
                        </div>
                    </>
                )}

                {loading && <div className="loader-inline"></div>}
            </div>
            {helperBadge && <div className="helper-badge">{helperBadge}</div>}
        </div>
    );
};

export default DynamicSelect;
