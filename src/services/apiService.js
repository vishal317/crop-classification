import { APP_CONFIG } from '../config/appConfig';
import { API_ENDPOINTS } from '../config/apiEndpoints';

const apiService = {
    get: async (endpoint, params = {}) => {
        if (endpoint.startsWith('http')) {
            try {
                const response = await fetch(endpoint);
                return await response.json();
            } catch (error) {
                console.error("API fetch error:", error);
                throw error;
            }
        }
        return new Promise((resolve) => {
            setTimeout(() => {
                if (endpoint === API_ENDPOINTS.FETCH_FIELD_PROFILE) {
                    resolve({
                        soilTypes: ["Sandy", "Clay", "Loamy"],
                        coordinates: [34.0522, -118.2437],
                        boundaryPolygon: [
                            [34.0522, -118.2437],
                            [34.0532, -118.2437],
                            [34.0532, -118.2427],
                            [34.0522, -118.2427]
                        ]
                    });
                } else {
                    resolve({});
                }
            }, 500);
        });
    },

    post: async (endpoint, data, isMultipart = false) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (endpoint === API_ENDPOINTS.START_ANALYSIS) {
                    resolve({ processId: `PROC-${Math.floor(Math.random() * 10000)}` });
                } else {
                    resolve({ success: true });
                }
            }, 500);
        });
    },

    uploadWithProgress: (endpoint, file, onProgress) => {
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                onProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    resolve({
                        fileId: `FILE-${Math.floor(Math.random() * 10000)}`,
                        previewUrl: URL.createObjectURL(file)
                    });
                }
            }, 200);

            // Return mock cancel function
            return () => clearInterval(interval);
        });
    }
};

export default apiService;
