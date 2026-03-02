import React from 'react';
import { Info } from 'lucide-react';
import styles from './progress.module.css';

const SystemNoteCard = ({ title, content }) => {
    return (
        <div className={styles.systemNoteCard}>
            <Info size={20} strokeWidth={3} />
            <div className={styles.noteContent}>
                <h4>{title}</h4>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default SystemNoteCard;
