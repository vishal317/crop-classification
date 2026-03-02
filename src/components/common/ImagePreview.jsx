import React from 'react';
import './ImagePreview.css';
import { LABELS } from '../../constants/labels';

const ImagePreview = ({ imageUrl }) => {
    return (
        <div className="image-preview-wrapper">
            <div className="preview-tab">IMAGERY PREVIEW</div>
            <div className="preview-content-box">
                {imageUrl ? (
                    <img src={imageUrl} alt="Imagery Preview" className="preview-image" />
                ) : (
                    <div className="empty-preview-state">
                        <div className="empty-icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                        </div>
                        <div className="empty-text">NO CONTENT SELECTED</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
