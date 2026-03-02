import React from 'react';
import { Check, Square, Hourglass } from 'lucide-react';
import styles from './progress.module.css';

const StepItem = ({ title, subtitle, status, isLast }) => {
    const getIcon = () => {
        switch (status) {
            case 'completed':
                return <Check size={14} strokeWidth={4} />;
            case 'active':
                return <div className={styles.activeDot} />;
            case 'pending':
                return <Hourglass size={14} strokeWidth={3} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.stepItem}>
            <div className={styles.statusIndicator}>
                <div className={`${styles.statusIcon} ${styles[status]}`}>
                    {getIcon()}
                </div>
                {!isLast && <div className={`${styles.connector} ${styles[status] === 'pending' ? styles.pending : ''}`} />}
            </div>
            <div className={styles.stepContent}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>
        </div>
    );
};

export default StepItem;
