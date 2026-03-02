import React from 'react';
import StepItem from './StepItem';
import styles from './progress.module.css';

const StepTimeline = ({ steps }) => {
    return (
        <div className={styles.timeline}>
            {steps.map((step, index) => (
                <StepItem
                    key={index}
                    title={step.title}
                    subtitle={step.subtitle}
                    status={step.status}
                    isLast={index === steps.length - 1}
                />
            ))}
        </div>
    );
};

export default StepTimeline;
