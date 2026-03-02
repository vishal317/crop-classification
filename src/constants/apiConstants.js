// API Base URLs
export const API_BASE_URL = 'https://shredlike-cedrick-nonpursuantly.ngrok-free.dev';

// API Endpoints
export const API_ENDPOINTS = {
  PREDICT_MOSQUITO: 'predict_mosquito',
  PREDICT_WEEDS: 'predict_weeds',
  GET_SERVICE_REQUESTS: 'get_service_requests',
  GET_CHEMICAL_TREATMENT: 'get_chemical_treatment'
};

// Request Headers
export const API_HEADERS = {
  NGROK_SKIP_WARNING: 'ngrok-skip-browser-warning'
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  GREEN_POOLS_DETECTED: 'green_pools_detected',
  NO_GREEN_POOLS: 'no_green_pools'
};

// File Upload Limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  SUPPORTED_FORMATS: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.tiff', '.tif'],
  TIFF_EXTENSIONS: ['.tiff', '.tif']
};
