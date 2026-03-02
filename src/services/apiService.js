import { APP_CONFIG } from '../config/appConfig';

const apiService = {
    get: async (endpoint, params = {}) => {
        const url = new URL(`${APP_CONFIG.API_BASE_URL}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    post: async (endpoint, data, isMultipart = false) => {
        const url = `${APP_CONFIG.API_BASE_URL}${endpoint}`;
        const options = {
            method: 'POST',
            body: isMultipart ? data : JSON.stringify(data),
            headers: isMultipart ? {} : { 'Content-Type': 'application/json' }
        };

        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    uploadWithProgress: (endpoint, file, onProgress) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const url = `${APP_CONFIG.API_BASE_URL}${endpoint}`;

            xhr.open('POST', url);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    onProgress(percent);
                }
            };

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.onabort = () => reject(new Error('Upload cancelled'));

            const formData = new FormData();
            formData.append('file', file);
            xhr.send(formData);

            // Return cancel function
            return () => xhr.abort();
        });
    }
};

export default apiService;
