// App Information
export const APP_INFO = {
  NAME: 'Frontier Precision Image Recognition',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-powered image analysis for mosquito breeding sites and plant detection'
};

// Detection Types
export const DETECTION_TYPES = {
  MOSQUITO: 'mosquito detection',
  WEED: 'weed detection'
};

// Detection Methods
export const DETECTION_METHODS = {
  BINARY_CLASSIFICATION: 'Binary Classification',
  CLEAN_CLASSIFICATION: 'Clean Classification',
  OBJECT_DETECTION: 'Object Detection',
  NO_DETECTION: 'No Detection',
  API_STATUS: 'API Status'
};

// Confidence Thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH_CONFIDENCE: 0.8,
  MEDIUM_CONFIDENCE: 0.7,
  LOW_CONFIDENCE: 0.65,
  STRONG_DETECTION_MIN: 0.65,
  OBJECT_DETECTION_MIN: 0.7,
  HIGH_CONFIDENCE_DISPLAY: 0.75
};

// UI Messages
export const UI_MESSAGES = {
  UPLOADING: '📤 Uploading Image...',
  PROCESSING: 'Please wait while we process your image',
  ANALYZING: 'Analyzing for Mosquito Detection...',
  GREEN_POOLS_DETECTED: '🚨 Green Pools Detected',
  NO_GREEN_POOLS: '❌ No Green Pools Detected',
  POSSIBLE_GREEN_POOLS: '⚠️ Possible Green Pools Detected',
  UPLOAD_SUCCESS: 'Image uploaded successfully!',
  UPLOAD_ERROR: 'Failed to process image. Please try again.',
  FILE_SIZE_ERROR: 'File size should be less than 10MB',
  FILE_TYPE_ERROR: 'Please select an image file'
};

// UI Icons
export const UI_ICONS = {
  SUCCESS: '✅',
  WARNING: '⚠️',
  ERROR: '❌',
  LOADING: '🔄',
  UPLOAD: '📤',
  MOSQUITO: '🦟',
  PLANT: '🌿'
};

// CSS Classes
export const CSS_CLASSES = {
  DETECTION_RESULT: {
    POSITIVE: 'detection-result positive',
    MODERATE: 'detection-result moderate',
    NEGATIVE: 'detection-result negative'
  },
  UPLOAD_STATES: {
    UPLOADING: 'upload-area uploading',
    DRAG_OVER: 'upload-area drag-over',
    DEFAULT: 'upload-area'
  }
};

// Form Validation
export const VALIDATION = {
  MAX_FILE_SIZE_MB: 10,
  MIN_CONFIDENCE_DISPLAY: 0.5,
  MAX_RESULTS_DISPLAY: 100
};

// Local Storage Keys
export const STORAGE_KEYS = {
  LAST_UPLOAD: 'lastUploadedImage',
  USER_PREFERENCES: 'userPreferences',
  DETECTION_HISTORY: 'detectionHistory'
};

// Map Integrations
export const MAP_INTEGRATIONS = {
  // Use this URL to configure the ArcGIS embedded web map (Legacy Iframe)
  ARCGIS_STRESS_MAP_URL: 'https://successivetech.maps.arcgis.com/apps/mapviewer/index.html?webmap=abeba7968fb4479082956374fac1740b&extent=true&home=true&zoom=true&scale=true&search=true&selections=true&legend=true',
  
  // Use this Map/Layer ID for the native ArcGIS JS SDK (@arcgis/core)
  ARCGIS_STRESS_MAP_ID: 'abeba7968fb4479082956374fac1740b',
  ARCGIS_STRESS_LAYER_ID: 'e9a5d3586d3b4992b387d81928fd64af'
};