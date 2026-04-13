import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProgressCard from './ProgressCard';
import StepTimeline from './StepTimeline';
import SystemNoteCard from './SystemNoteCard';
import { LABELS } from '../../constants/labels';
import { API_ENDPOINTS } from '../../config/apiEndpoints';
import styles from './progress.module.css';

const AnalysisProgress = () => {
    let { processId } = useParams();
    if (!processId) processId = "DEMO-8822";
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date().toISOString().replace('T', ' ').substring(0, 19) + '_UTC');

    const steps = [
        {
            title: LABELS.STEP_CROP_IDENTIFICATION_TITLE,
            subtitle: progress >= 30 ? 'Result: Zea mays (Corn) - Confirmed' : LABELS.STEP_CROP_IDENTIFICATION_ACTIVE,
            status: progress >= 30 ? 'completed' : 'active'
        },
        {
            title: LABELS.STEP_HEALTH_ASSESSMENT_TITLE,
            subtitle: progress >= 70 ? 'NDVI: 0.82 | Chlorophyll: High' : (progress >= 30 ? LABELS.STEP_HEALTH_ASSESSMENT_ACTIVE : LABELS.STEP_HEALTH_ASSESSMENT_PENDING),
            status: progress >= 70 ? 'completed' : (progress >= 30 ? 'active' : 'pending')
        },
        {
            title: LABELS.STEP_YIELD_PREDICTION_TITLE,
            subtitle: progress === 100 ? 'Yield Est: 9.4 Tons/Ha' : (progress >= 70 ? LABELS.STEP_YIELD_PREDICTION_ACTIVE : LABELS.STEP_YIELD_PREDICTION_PENDING),
            status: progress === 100 ? 'completed' : (progress >= 70 ? 'active' : 'pending')
        }
    ];

    // Simulation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const increment = Math.floor(Math.random() * 5) + 2; // 2-6% increment
                const nextProgress = Math.min(prev + increment, 100);
                return nextProgress;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Redirect effect
    useEffect(() => {
        if (progress === 100) {
            localStorage.setItem('analysisComplete', 'true');
            window.dispatchEvent(new Event('analysis-complete'));
            
            const timeout = setTimeout(() => {
                navigate(`${API_ENDPOINTS.ANALYSIS_RESULT_PATH}/${processId}`);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [progress, processId, navigate]);

    // Update timestamp occasionally
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date().toISOString().replace('T', ' ').substring(0, 19) + '_UTC');
        }, 60000);
        return () => clearInterval(timeInterval);
    }, []);

    const calculateETA = () => {
        if (progress === 100) return "00:00";
        if (progress === 0) return "03:00";

        const remaining = 100 - progress;
        const totalSeconds = Math.ceil(remaining * 3.8);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.analysisProgress}>
            <div className={styles.headerSection}>
                <div className={styles.processId}>{LABELS.PROCESS_ACTIVE_LABEL}: {processId}</div>
                <h1 className={styles.title}>{LABELS.ANALYSIS_TITLE}</h1>

                <div className={styles.metadataBlock}>
                    <div>
                        <strong>{LABELS.DATA_STREAM_LABEL}:</strong> 4920-XJ<br />
                        <strong>{LABELS.RESOLUTION_LABEL}:</strong> HIGH_RES_SPECTRAL<br />
                        <strong>{LABELS.TIMESTAMP_LABEL}:</strong> {currentTime}
                    </div>
                </div>
            </div>

            <ProgressCard
                progress={progress}
                eta={calculateETA()}
            />

            <StepTimeline steps={steps} />

            <SystemNoteCard
                title={LABELS.SYSTEM_NOTE_TITLE}
                content={LABELS.SYSTEM_NOTE_CONTENT}
            />
        </div>
    );
};

export default AnalysisProgress;
