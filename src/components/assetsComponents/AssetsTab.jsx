import React, { useState, useEffect, useCallback } from 'react';
import UploadAssets from './UploadAssets';
import { getAssets } from '../../api/assetsAPI/getAssets';
import '../../styles/AssetsTab.css';

const AssetsTab = ({ projectId }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAssets(projectId);
      if (response.success) {
        setAssets(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch assets:", err);
      setError("Failed to load assets. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchAssets();
    }
  }, [projectId, fetchAssets]);

  const handleDownload = (fileUrl) => {
    // Open in new tab which typically triggers download for cloud storage URLs
    window.open(fileUrl, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="assets-tab-container">
      <div className="assets-header">
        <h2>Project Assets</h2>
        <UploadAssets projectId={projectId} onUploadSuccess={fetchAssets} />
      </div>

      {loading ? (
        <div className="assets-loading">
          <div className="loader"></div>
          <p>Loading assets...</p>
        </div>
      ) : error ? (
        <div className="assets-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchAssets} className="retry-btn">Retry</button>
        </div>
      ) : assets.length === 0 ? (
        <div className="no-assets">
          <div className="no-assets-icon">📂</div>
          <p>No assets uploaded yet.</p>
          <p className="subtext">Upload images, videos, or documents to get started.</p>
        </div>
      ) : (
        <div className="assets-grid">
          {assets.map((asset) => (
            <div key={asset.id} className="asset-card">
              <div className="asset-icon">
                {asset.type === 'image' ? '🖼️' : 
                 asset.type === 'video' ? '🎬' : 
                 asset.type === 'audio' ? '🎵' : 
                 asset.type === 'document' ? '📄' : '📁'}
              </div>
              <div className="asset-details">
                <h3 className="asset-title" title={asset.title}>{asset.title}</h3>
                <div className="asset-meta">
                  <span className="asset-type">{asset.type}</span>
                  <span className="dot">•</span>
                  <span className="asset-date">{formatDate(asset.created_at)}</span>
                </div>
              </div>
              <div className="asset-actions">
                <button 
                  onClick={() => handleDownload(asset.file_url)}
                  className="download-btn"
                  title="Download File"
                >
                  <span className="download-icon">⬇️</span> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetsTab;
