import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import './ToastNotification.css';

const ToastNotification = ({ message, type = 'error', onClose, duration = 5000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={`toast - notification ${type} `}>
            <div className="toast-icon">
                {type === 'success' ? (
                    <CheckCircle2 size={20} strokeWidth={3} />
                ) : (
                    <AlertCircle size={20} strokeWidth={3} />
                )}
            </div>
            <div className="toast-content">{message}</div>
            <button className="toast-close" onClick={onClose}>
                <X size={18} />
            </button>
        </div>
    );
};

export default ToastNotification;
