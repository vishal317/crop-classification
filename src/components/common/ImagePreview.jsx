import React from 'react';
import { FileImage } from 'lucide-react';
import './ImagePreview.css';
import { LABELS } from '../../constants/labels';

const ImagePreview = ({ imageUrls = [] }) => {
    return (
        <div className="image-preview-wrapper">
            <div className="preview-tab">IMAGERY PREVIEW ({imageUrls.length}/18)</div>
            <div className="preview-content-box" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                {imageUrls && imageUrls.length > 0 ? (
                    <div className="preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', padding: '10px' }}>
                        {imageUrls.map((url, idx) => (
                            <div key={idx} className="preview-item" style={{ border: '2px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-color)' }}>
                                {url === 'placeholder-tif' ? (
                                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                        <FileImage size={32} />
                                        <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>TIFF IMAGE</div>
                                    </div>
                                ) : (
                                    <img src={url} alt={`Preview ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                )}
                            </div>
                        ))}
                    </div>
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
