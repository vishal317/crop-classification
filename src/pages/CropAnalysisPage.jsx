import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Search, List, X, CheckCircle2 } from 'lucide-react';
import FileUpload from '../components/common/FileUpload';
import ImagePreview from '../components/common/ImagePreview';
import DynamicSelect from '../components/common/DynamicSelect';
import SliderInput from '../components/common/SliderInput';
import CheckboxField from '../components/common/CheckboxField';
import FieldMap from '../components/common/FieldMap';
import FormFieldWrapper from '../components/common/FormFieldWrapper';
import PrimaryButton from '../components/common/PrimaryButton';
import ToastNotification from '../components/common/ToastNotification';
import useFileUpload from '../hooks/useFileUpload';
import useCropAnalysisForm from '../hooks/useCropAnalysisForm';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { LABELS } from '../constants/labels';
import './CropAnalysisPage.css';

const CropAnalysisPage = () => {
    const navigate = useNavigate();
    const { uploadState, uploadFile, cancelUpload } = useFileUpload();
    const {
        formData,
        fieldProfile,
        status: formStatus,
        updateField,
        isValid: isFormValid
    } = useCropAnalysisForm();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [toast, setToast] = useState(null);

    const handleFileSelect = (file) => {
        uploadFile(file);
    };

    const handleStartAnalysis = async () => {
        if (!isFormValid || uploadState.status !== 'success') return;

        setIsAnalyzing(true);
        try {
            const payload = {
                fileId: uploadState.fileId,
                targetYield: parseFloat(formData.targetYield),
                locationId: formData.locationId,
                soilCategory: formData.soilCategory,
                moistureLevel: formData.moistureLevel,
                anomalyDetectionEnabled: formData.anomalyDetectionEnabled
            };

            const response = await apiService.post(API_ENDPOINTS.START_ANALYSIS, payload);
            const processId = response.processId || `ID_${Math.floor(Math.random() * 10000)}`;

            // Redirect to progress screen
            navigate(`/analysis/progress/${processId}`);
        } catch (error) {
            setToast({ message: `Error starting analysis: ${error.message} `, type: 'error' });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="crop-analysis-page">
            <header className="page-header">
                <div className="title-actions">
                    <div className="title-group">
                        <h1 className="page-title">{LABELS.PAGE_TITLE}</h1>
                        <p className="page-subtitle">LOFI WIREFRAME - DATA ENTRY MODULE</p>
                    </div>
                    <div className="header-actions">
                        <PrimaryButton
                            variant="secondary"
                            onClick={() => window.location.reload()}
                            className="outline-btn"
                        >
                            CANCEL
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={handleStartAnalysis}
                            disabled={!isFormValid || uploadState.status !== 'success' || isAnalyzing}
                            loading={isAnalyzing}
                        >
                            START ANALYSIS
                        </PrimaryButton>
                    </div>
                </div>
            </header>

            <div className="analysis-grid">
                {/* Section 1: Imagery Upload */}
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-icon">
                            <Upload size={24} strokeWidth={3} />
                        </span>
                        <h2 className="section-title">1. IMAGERY UPLOAD</h2>
                    </div>

                    <FileUpload
                        onFileSelect={handleFileSelect}
                        progress={uploadState.progress}
                        status={uploadState.status}
                        errorMessage={uploadState.errorMessage}
                        onCancel={cancelUpload}
                    />

                    <ImagePreview imageUrl={uploadState.previewUrl} />
                </div>

                {/* Section 2: Input Data */}
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-icon">
                            <List size={24} strokeWidth={3} />
                        </span>
                        <h2 className="section-title">2. INPUT DATA</h2>
                    </div>

                    <div className="input-data-box">
                        <div className="form-grid">
                            <FormFieldWrapper label="TARGET YIELD (T/HA)">
                                <input
                                    type="text"
                                    className="lofi-input"
                                    placeholder="00.00"
                                    value={formData.targetYield}
                                    onChange={(e) => updateField('targetYield', e.target.value)}
                                />
                            </FormFieldWrapper>

                            <FormFieldWrapper
                                label="LOCATION ID / NAME"
                                error={formStatus.error}
                            >
                                <div className="lofi-search-container">
                                    <span className="pin-icon">
                                        <MapPin size={14} strokeWidth={3} />
                                    </span>
                                    <input
                                        type="text"
                                        className="lofi-input with-icon"
                                        placeholder="FIELD_COORD_ID"
                                        value={formData.locationId}
                                        onChange={(e) => updateField('locationId', e.target.value)}
                                        disabled={!formData.targetYield}
                                    />
                                </div>
                            </FormFieldWrapper>

                            <FormFieldWrapper label="SOIL CATEGORY">
                                <DynamicSelect
                                    options={fieldProfile.soilTypes}
                                    value={formData.soilCategory}
                                    onChange={(val) => updateField('soilCategory', val)}
                                    disabled={!formData.locationId || formStatus.loading}
                                    loading={formStatus.loading}
                                    placeholder="SELECT TYPE..."
                                    helperBadge={fieldProfile.isFiltered ? "Filtered based on field profile" : null}
                                />
                            </FormFieldWrapper>

                            <FormFieldWrapper label="CURRENT MOISTURE LEVEL">
                                <SliderInput
                                    value={formData.moistureLevel}
                                    onChange={(val) => updateField('moistureLevel', val)}
                                    labels={['DRY', 'OPTIMAL', 'WET']}
                                />
                            </FormFieldWrapper>
                        </div>

                        <div className="mt-6">
                            <CheckboxField
                                label="ENABLE AI ANOMALY DETECTION PROTOCOL"
                                checked={formData.anomalyDetectionEnabled}
                                onChange={(val) => updateField('anomalyDetectionEnabled', val)}
                            />
                        </div>
                    </div>

                    <FieldMap
                        coordinates={fieldProfile.coordinates}
                        boundaryPolygon={fieldProfile.boundaryPolygon}
                    />
                </div>
            </div>

            {toast && (
                <ToastNotification
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default CropAnalysisPage;
