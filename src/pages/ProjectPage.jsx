import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchProjectDetails } from "../api/ProjectPage/fetchProjectDetails.api";
import "../styles/ProjectPage.css";

import Invite from "../components/ProjectPage/Invite";

const ProjectPage = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("assets");

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is an invited project from URL query parameter
  const isInvited = new URLSearchParams(location.search).get('invited') === 'true';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetchProjectDetails({ projectID: id, token });

        setProjectDetails(response.data || response);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load project details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="project-page-container">
        <div className="loading-state">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-page-container">
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={handleBack} className="back-btn">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!projectDetails) {
    return (
      <div className="project-page-container">
        <div className="empty-state">No project details found</div>
      </div>
    );
  }

  return (
    <div className="project-page-container">
      {/* Header */}
      <div className="project-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Dashboard
        </button>
        <h1 className="project-title">{projectDetails.name}</h1>
        <p className="project-meta">
          <strong>Client:</strong> {projectDetails.client_name} •
          <strong> Deadline:</strong>{" "}
          {new Date(projectDetails.deadline).toLocaleDateString()}
        </p>
      </div>

      {/* Only show Invite for projects you own, not for invited projects */}
      {!isInvited && (
        <div>
          <Invite projectID={id} />
        </div>
      )}
      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "assets" ? "active" : ""}`}
            onClick={() => setActiveTab("assets")}
          >
            <span className="tab-icon">📄</span>
            Assets
          </button>
          <button
            className={`tab ${activeTab === "final" ? "active" : ""}`}
            onClick={() => setActiveTab("final")}
          >
            <span className="tab-icon">↗️</span>
            Final
          </button>
          <button
            className={`tab ${activeTab === "track" ? "active" : ""}`}
            onClick={() => setActiveTab("track")}
          >
            <span className="tab-icon">✓</span>
            Track
          </button>
        </div>
        <button className="upload-file-btn">Upload file</button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "assets" && <div className="assets-section"></div>}

        {activeTab === "final" && (
          <div className="final-section">
            <div className="empty-final">
              <p>No final deliverables yet</p>
              <p className="hint">Upload final work when ready</p>
            </div>
          </div>
        )}

        {activeTab === "track" && (
          <div className="track-section">
            <div className="timeline">
              <h3>Project Timeline</h3>
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-content">
                  <h4>Project Created</h4>
                  <p>Initial project setup complete</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
