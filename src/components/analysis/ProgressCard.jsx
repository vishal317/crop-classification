import React from 'react';
import { Clock } from 'lucide-react';
import { LABELS } from '../../constants/labels';
import styles from './progress.module.css';

const ProgressCard = ({ progress, eta }) => {
    return (
        <div className={styles.progressCard}>
            <div className={styles.cardHeader}>
                <div>
                    <h2 className={styles.cardTitle}>{LABELS.OVERALL_COMPUTATION_TITLE}</h2>
                    <p className={styles.cardSubtitle}>{LABELS.COMPUTATION_SUBTITLE}</p>
                </div>
                <div className={styles.percentage}>{progress}%</div>
            </div>

            <div className={styles.progressBarTrack}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${progress}%` }}
                >
                    <span className={styles.loadingText}>{LABELS.LOADING_TEXT}</span>
                </div>
            </div>

            <div className={styles.etaBlock}>
                <Clock size={14} strokeWidth={3} />
                <span>{LABELS.ETA_LABEL}: {eta}</span>
            </div>
        </div>
    );
};

export default ProgressCard;
