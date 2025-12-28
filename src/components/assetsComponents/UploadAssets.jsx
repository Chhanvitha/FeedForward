import React, { useState } from "react";
import "../../styles/UploadAssets.css";
import { uploadAssets } from "../../api/assetsAPI/uploadAssets";

const UploadAssets = ({ projectId, onUploadSuccess }) => {
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError("");

    // Validation
    if (!filename || !filename.trim()) {
      setError("Please enter a filename");
      return;
    }

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!projectId) {
      setError("No project ID found");
      return;
    }

    try {
      setUploading(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append("filename", filename.trim());
      formData.append("file", file);
      formData.append("project_id", projectId);

      console.log("Uploading asset:", {
        filename: filename.trim(),
        fileSize: file.size,
        fileType: file.type,
        projectId,
      });

      await uploadAssets({ formData, token, projectId });
      
      alert("Asset uploaded successfully! ✅");
      
      // Reset form
      setFilename("");
      setFile(null);
      setOpen(false);

      // Trigger refresh in parent component
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error("Upload error:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || "Failed to upload asset";
      const errorDetails = error.response?.data?.error || "";
      
      setError(`${errorMessage}${errorDetails ? ` - ${errorDetails}` : ""}`);
      alert(`❌ Upload failed:\n${errorMessage}\n${errorDetails}`);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(""); // Clear error when file is selected
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setOpen(false);
      setFilename("");
      setFile(null);
      setError("");
    }
  };

  return (
    <div>
      <button 
        className="upload-button" 
        onClick={() => setOpen(true)}
        disabled={!projectId}
      >
        📤 Upload Asset
      </button>

      {open && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Upload Asset to Project</h3>
            
            {error && (
              <div className="error-alert">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={submitHandler} className="upload-form">
              <div className="form-group">
                <label>Asset Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Logo Design"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  disabled={uploading}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Choose File *</label>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  disabled={uploading}
                  accept="*/*"
                />
                {file && (
                  <div className="file-info">
                    📎 {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </div>
                )}
              </div>

              <div className="actions">
                <button 
                  type="submit" 
                  disabled={uploading || !filename || !file}
                  className="submit-btn"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                <button 
                  type="button" 
                  onClick={handleClose}
                  disabled={uploading}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAssets;
