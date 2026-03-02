import { useState, useRef } from "react";
import "./ImageUploader.css";
import { API_BASE_URL, API_ENDPOINTS, API_HEADERS, HTTP_METHODS, UPLOAD_LIMITS } from "../constants/apiConstants";
import { UI_MESSAGES, DETECTION_TYPES } from "../constants/appConstants";

const ImageUploader = ({ onImageUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Upload image to API endpoint
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // Determine endpoint based on file type
    const isTiff = UPLOAD_LIMITS.TIFF_EXTENSIONS.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    // Keep the mosquito detection for TIFF files, use weeds for others
    const endpoint = isTiff ? API_ENDPOINTS.PREDICT_MOSQUITO : API_ENDPOINTS.PREDICT_WEEDS;
    const apiUrl = `${API_BASE_URL}/${endpoint}`;

    const response = await fetch(apiUrl, {
      method: HTTP_METHODS.POST,
      body: formData,
      headers: {
        [API_HEADERS.NGROK_SKIP_WARNING]: "true",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }


    return data;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file) => {
    if (file.size > UPLOAD_LIMITS.MAX_FILE_SIZE) {
      alert(UI_MESSAGES.FILE_SIZE_ERROR);
      return;
    }

    const isTiff = UPLOAD_LIMITS.TIFF_EXTENSIONS.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );
    if (!file.type.startsWith("image/") && !isTiff) {
      alert(UI_MESSAGES.FILE_TYPE_ERROR);
      return;
    }

    setIsUploading(true);

    const processImage = async () => {
      try {
        const data = await uploadImage(file);

        let imageUrl = null;
        if (!isTiff) {
          imageUrl = URL.createObjectURL(file);
        }

        onImageUpload({
          file: file,
          url: imageUrl,
          predictions: data?.detections || [],
          zones: data?.zones || [],
          apiError: null,
          detectionType: isTiff ? DETECTION_TYPES.MOSQUITO : DETECTION_TYPES.WEED,
        });
      } catch (error) {
        console.error("API Error:", error);
        onImageUpload({
          file: file,
          url: !isTiff ? URL.createObjectURL(file) : null,
          predictions: undefined,
          zones: [],
          apiError: error.message || UI_MESSAGES.UPLOAD_ERROR,
          detectionType: isTiff ? DETECTION_TYPES.MOSQUITO : DETECTION_TYPES.WEED,
        });
      } finally {
        setIsUploading(false);
      }
    };

    processImage();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (isUploading) {
    return (
      <div className="upload-container">
        <div className="upload-area uploading">
          <div className="upload-spinner">
            <div className="spinner-large"></div>
          </div>
          <h3>{UI_MESSAGES.UPLOADING}</h3>
          <p>{UI_MESSAGES.PROCESSING}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-container">
      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.gif,.tiff,.tif"
          onChange={handleFileInput}
          className="file-input"
        />

        <div className="upload-icon">
          <div className="icon-container">
            <div className="upload-arrow">↗</div>
            <div className="upload-cloud">☁️</div>
          </div>
        </div>

        <div className="upload-content">
          <h3>Drop your image here</h3>
          <p>
            or <span className="browse-text">browse files</span> from your
            device
          </p>

          <div className="supported-formats">
            <div className="format-tags">
              <div className="format-tag">JPG</div>
              <div className="format-tag">PNG</div>
              <div className="format-tag">TIFF</div>
            </div>
          </div>

          <div className="upload-info">
            <p>📏 Max file size: 10MB</p>
            <p>🌿 Best results with clear, well-lit photos</p>
          </div>
        </div>

        <div className="upload-animation">
          <div className="float-particle particle-1">��</div>
          <div className="float-particle particle-2">🍃</div>
          <div className="float-particle particle-3">🌱</div>
          <div className="float-particle particle-4">🌾</div>
        </div>
      </div>

      <div className="upload-tips">
        <h4>📸 Tips for better results:</h4>
        <ul>
          <li>Take photos in good lighting</li>
          <li>Ensure the plant is clearly visible</li>
          <li>Include leaves, flowers, or distinctive features</li>
          <li>Avoid blurry or very dark images</li>
          <li>Prefer images captured by drone or satellite for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
