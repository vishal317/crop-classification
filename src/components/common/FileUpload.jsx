import React, { useState, useRef } from 'react';
import { Plus, X, Info } from 'lucide-react';
import PrimaryButton from './PrimaryButton';
import './FileUpload.css';
import { LABELS } from '../../constants/labels';

const FileUpload = ({
    onFileSelect,
    progress,
    status,
    errorMessage,
    onCancel,
    allowedTypes = ["image/jpeg", "image/png", "image/tiff"],
    maxSizeMB = 500
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) validateAndSelectFile(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) validateAndSelectFile(file);
    };

    const validateAndSelectFile = (file) => {
        // Basic validation (more detailed validation in the hook)
        onFileSelect(file);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="file-upload-container">
            <div
                className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={status === 'uploading' ? null : triggerFileInput}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={allowedTypes.join(',')}
                    style={{ display: 'none' }}
                />

                <div className="upload-icon">
                    <Plus size={48} strokeWidth={2.5} />
                </div>

                <h3 className="upload-title">{LABELS.UPLOAD_BOX_TITLE}</h3>
                <p className="upload-subtitle">{LABELS.UPLOAD_BOX_SUBTITLE}</p>

                <PrimaryButton
                    variant="secondary"
                    onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                    }}
                    disabled={status === 'uploading'}
                >
                    {LABELS.BROWSE_BUTTON}
                </PrimaryButton>

                {status === 'uploading' && (
                    <div className="progress-container" onClick={(e) => e.stopPropagation()}>
                        <div className="progress-header">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <button
                            type="button"
                            className="browse-button outline"
                            onClick={() => fileInputRef.current.click()}
                        >
                            BROWSE STORAGE
                        </button>
                    </div>
                )}

                {errorMessage && (
                    <div className="upload-error" onClick={(e) => e.stopPropagation()}>
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
