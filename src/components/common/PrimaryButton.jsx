import React from 'react';
import { Loader2 } from 'lucide-react';
import './PrimaryButton.css';

const PrimaryButton = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button',
    className = '',
    fullWidth = false,
    loading = false
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`primary-button variant-${variant} ${fullWidth ? 'full-width' : ''} ${className}`}
        >
            {loading ? (
                <Loader2 size={18} className="animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default PrimaryButton;
