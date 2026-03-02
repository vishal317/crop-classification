import { useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/apiService';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const DEFAULT_SOIL_TYPES = [
    { value: 'Sandy', label: 'Sandy' },
    { value: 'Clay', label: 'Clay' },
    { value: 'Loamy', label: 'Loamy' },
    { value: 'Silt', label: 'Silt' },
    { value: 'Peaty', label: 'Peaty' },
    { value: 'Chalky', label: 'Chalky' }
];

const useCropAnalysisForm = () => {
    const [formData, setFormData] = useState({
        targetYield: '',
        locationId: '',
        soilCategory: '',
        moistureLevel: 50,
        anomalyDetectionEnabled: false
    });

    const [fieldProfile, setFieldProfile] = useState({
        coordinates: null,
        boundaryPolygon: null,
        soilTypes: DEFAULT_SOIL_TYPES,
        isFiltered: false
    });

    const [status, setStatus] = useState({
        loading: false,
        error: null
    });

    const debounceTimer = useRef(null);

    const fetchFieldProfile = useCallback(async (locationId) => {
        setStatus({ loading: true, error: null });
        try {
            const data = await apiService.get(API_ENDPOINTS.FETCH_FIELD_PROFILE, { locationId });

            if (data && data.soilTypes) {
                const filteredSoils = data.soilTypes.map(s => ({ value: s, label: s }));
                setFieldProfile({
                    coordinates: data.coordinates,
                    boundaryPolygon: data.boundaryPolygon,
                    soilTypes: filteredSoils,
                    isFiltered: true
                });

                // Auto-select if only 1 soil type
                if (filteredSoils.length === 1) {
                    setFormData(prev => ({ ...prev, soilCategory: filteredSoils[0].value }));
                }
            } else {
                throw new Error("Invalid Location ID");
            }
        } catch (error) {
            console.error("Failed to fetch field profile", error);
            setStatus({ loading: false, error: "Invalid Location ID" });
            // Revert to full list
            setFieldProfile(prev => ({
                ...prev,
                soilTypes: DEFAULT_SOIL_TYPES,
                isFiltered: false,
                coordinates: null,
                boundaryPolygon: null
            }));
        } finally {
            setStatus(prev => ({ ...prev, loading: false }));
        }
    }, []);

    useEffect(() => {
        if (formData.targetYield && formData.locationId) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);

            debounceTimer.current = setTimeout(() => {
                fetchFieldProfile(formData.locationId);
            }, 500);
        } else {
            // Reset if either is empty
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            setFieldProfile({
                coordinates: null,
                boundaryPolygon: null,
                soilTypes: DEFAULT_SOIL_TYPES,
                isFiltered: false
            });
            setStatus({ loading: false, error: null });
            setFormData(prev => ({ ...prev, soilCategory: '' }));
        }

        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [formData.targetYield, formData.locationId, fetchFieldProfile]);

    const updateField = useCallback((field, value) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };
            // If location changes, clear soil selection to trigger fresh fetch/logic
            if (field === 'locationId') {
                newData.soilCategory = '';
            }
            return newData;
        });
    }, []);

    const isValid =
        formData.targetYield > 0 &&
        formData.locationId !== '' &&
        formData.soilCategory !== '';

    return {
        formData,
        fieldProfile,
        status,
        updateField,
        isValid
    };
};

export default useCropAnalysisForm;
