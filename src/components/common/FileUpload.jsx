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
    const [localError, setLocalError] = useState("");
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
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) validateAndSelectFiles(files);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) validateAndSelectFiles(files);
    };

    const validateAndSelectFiles = (files) => {
        setLocalError("");
        if (files.length !== 18) {
            setLocalError(`Please select exactly 18 images. You selected ${files.length}.`);
            return;
        }

        const bandsFound = new Set();
        const timesFound = new Set();

        const bandKeywords = ["blue", "green", "red", "nir", "swir1", "swir2", "b01", "b02", "b03", "b04", "b05", "b06", "b07", "b08", "b8a", "b09", "b10", "b11", "b12"];
        const timeKeywords = ["t1", "t2", "t3", "time1", "time2", "time3"];

        files.forEach(file => {
            const name = file.name.toLowerCase();
            bandKeywords.forEach(b => { if (name.includes(b)) bandsFound.add(b); });

            // Matches standard HLS timestamp like 2025134T045659, standard dates, or explicit t1/time1 markers
            let timeMatch = name.match(/\d{7}t\d{6}|\d{8}t\d{6}|\d{4}-\d{2}-\d{2}|\btime[0-9]+\b|\bt[1-9]\b|_t[0-9]+/);
            if (timeMatch) {
                timesFound.add(timeMatch[0]);
            } else {
                timeKeywords.forEach(t => { if (name.includes(t)) timesFound.add(t); });
            }
        });

        if (bandsFound.size < 6) {
            setLocalError(`Validation failed: Found ${bandsFound.size} distinct bands. Exactly 6 are required (e.g., Blue, Green, Red, NIR, SWIR1, SWIR2 into the names).`);
            return;
        }
        if (timesFound.size < 3) {
            setLocalError(`Validation failed: Found ${timesFound.size} distinct time zones. Exactly 3 time indicators are required (e.g., T1, T2, T3).`);
            return;
        }

        onFileSelect(files);
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
                    multiple
                    style={{ display: 'none' }}
                />

                <div className="upload-icon">
                    <Plus size={48} strokeWidth={2.5} />
                </div>

                <h3 className="upload-title">{LABELS.UPLOAD_BOX_TITLE || "Upload 18 Images"}</h3>
                <p className="upload-subtitle">{LABELS.UPLOAD_BOX_SUBTITLE || "Drag and drop 18 TIFF/PNG/JPEG files here"}</p>

                <div className="upload-instructions">
                    <div className="instruction-item">
                        <Info size={16} />
                        <span><strong>Required:</strong> Exactly 18 files</span>
                    </div>
                    <div className="instruction-item">
                        <Info size={16} />
                        <span><strong>Bands:</strong> Names must include 6 bands (e.g. Blue, Green, Red, NIR, SWIR1, SWIR2)</span>
                    </div>
                    <div className="instruction-item">
                        <Info size={16} />
                        <span><strong>Time Zones:</strong> Names must indicate 3 distinct times (e.g. T1, T2, T3 or Dates)</span>
                    </div>
                </div>

                {status !== 'uploading' && (
                    <PrimaryButton
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            triggerFileInput();
                        }}
                    >
                        {LABELS.BROWSE_BUTTON}
                    </PrimaryButton>
                )}

                {status === 'uploading' && (
                    <div className="progress-container" onClick={(e) => e.stopPropagation()}>
                        <div className="progress-header">
                            <span>Uploading...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        {/* Duplicate button removed */}
                    </div>
                )}

                {(localError || errorMessage) && (
                    <div className="upload-error" onClick={(e) => e.stopPropagation()}>
                        {localError || errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
