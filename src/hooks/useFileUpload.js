import { useState, useCallback, useRef } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { APP_CONFIG } from '../config/appConfig';

const useFileUpload = () => {
    const [uploadState, setUploadState] = useState({
        files: [],
        progress: 0,
        status: 'idle',
        fileIds: [],
        previewUrls: [],
        errorMessage: null
    });

    const abortControllerRef = useRef(null);

    const reset = useCallback(() => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        setUploadState({
            files: [],
            progress: 0,
            status: 'idle',
            fileIds: [],
            previewUrls: [],
            errorMessage: null
        });
    }, []);

    const uploadFile = useCallback(async (selectedFiles) => {
        // Validation per file
        for (let file of selectedFiles) {
            if (file.size > APP_CONFIG.MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
                setUploadState(prev => ({ ...prev, errorMessage: `File ${file.name} size exceeds ${APP_CONFIG.MAX_UPLOAD_SIZE_MB}MB limit.`, status: 'error' }));
                return;
            }

            const isTif = file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff') || file.name.toLowerCase().includes('hls.');
            if (!APP_CONFIG.ALLOWED_FILE_TYPES.includes(file.type) && !isTif && !file.name.toLowerCase().match(/\.b[0-9a-z]{2}$/)) {
                setUploadState(prev => ({ ...prev, errorMessage: `Unsupported file type for ${file.name}.`, status: 'error' }));
                return;
            }
        }

        // Memory optimization: Don't read large TIFs into memory for previews
        const previewUrls = selectedFiles.map(file => {
            const isTif = file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff');
            if (isTif) {
                return "placeholder-tif"; // We will handle this string in ImagePreview
            }
            return URL.createObjectURL(file);
        });

        setUploadState({
            files: selectedFiles,
            progress: 0,
            status: 'uploading',
            fileIds: [],
            previewUrls,
            errorMessage: null
        });

        let uploadedIds = [];

        try {
            // Sequential upload logic for massive payloads
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const baseProgress = (i / selectedFiles.length) * 100;

                const response = await apiService.uploadWithProgress(
                    API_ENDPOINTS.UPLOAD_IMAGE,
                    file,
                    (fileProgress) => {
                        const aggregateProgress = Math.floor(baseProgress + (fileProgress / selectedFiles.length));
                        setUploadState(prev => ({ ...prev, progress: aggregateProgress }));
                    }
                );

                uploadedIds.push(response.fileId || `FILE-MOCK-${i}`);
            }

            setUploadState(prev => ({
                ...prev,
                status: 'success',
                fileIds: uploadedIds,
                progress: 100
            }));

            return uploadedIds;
        } catch (error) {
            setUploadState(prev => ({
                ...prev,
                status: 'error',
                errorMessage: error.message || 'Upload failed. Please try again.'
            }));
        }
    }, []);

    const cancelUpload = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setUploadState(prev => ({ ...prev, status: 'idle', progress: 0 }));
        }
    }, []);

    return { uploadState, uploadFile, cancelUpload, reset };
};

export default useFileUpload;
