import { useState, useCallback, useRef } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { APP_CONFIG } from '../config/appConfig';

const useFileUpload = () => {
    const [uploadState, setUploadState] = useState({
        file: null,
        progress: 0,
        status: 'idle',
        fileId: null,
        previewUrl: null,
        errorMessage: null
    });

    const cancelRef = useRef(null);

    const reset = useCallback(() => {
        if (cancelRef.current) cancelRef.current();
        setUploadState({
            file: null,
            progress: 0,
            status: 'idle',
            fileId: null,
            previewUrl: null,
            errorMessage: null
        });
    }, []);

    const uploadFile = useCallback(async (file) => {
        // Validation
        if (file.size > APP_CONFIG.MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
            setUploadState(prev => ({ ...prev, errorMessage: `File size exceeds ${APP_CONFIG.MAX_UPLOAD_SIZE_MB}MB limit.`, status: 'error' }));
            return;
        }

        if (!APP_CONFIG.ALLOWED_FILE_TYPES.includes(file.type)) {
            setUploadState(prev => ({ ...prev, errorMessage: "Unsupported file type. Please use JPEG, PNG, or TIFF.", status: 'error' }));
            return;
        }

        setUploadState({
            file,
            progress: 0,
            status: 'uploading',
            fileId: null,
            previewUrl: URL.createObjectURL(file),
            errorMessage: null
        });

        try {
            // Note: XMLHttpRequest doesn't easily return a cancel function from a promise wrapper 
            // without extra plumbing. I'll use a simplified version for now.
            const response = await apiService.uploadWithProgress(
                API_ENDPOINTS.UPLOAD_IMAGE,
                file,
                (progress) => setUploadState(prev => ({ ...prev, progress }))
            );

            setUploadState(prev => ({
                ...prev,
                status: 'success',
                fileId: response.fileId,
                previewUrl: response.previewUrl || prev.previewUrl,
                progress: 100
            }));

            return response.fileId;
        } catch (error) {
            setUploadState(prev => ({
                ...prev,
                status: 'error',
                errorMessage: error.message || 'Upload failed. Please try again.'
            }));
        }
    }, []);

    const cancelUpload = useCallback(() => {
        if (cancelRef.current) {
            cancelRef.current();
            setUploadState(prev => ({ ...prev, status: 'idle', progress: 0 }));
        }
    }, []);

    return { uploadState, uploadFile, cancelUpload, reset };
};

export default useFileUpload;
