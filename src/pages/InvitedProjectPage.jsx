import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectDetails } from "../api/ProjectPage/fetchProjectDetails.api";
import "../styles/ProjectPage.css";

const InvitedProjectPage = () => {
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("assets");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        console.log("Fetching invited project with ID:", id);
        const res = await fetchProjectDetails({ id, token });
        console.log("Invited project response:", res);
        setProjectDetails(res.data);
      } catch (err) {
        console.error("Fetch invited project details error:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);
        
        if (err.response?.status === 404) {
          setError("Project not found. It may have been deleted or you no longer have access.");
        } else if (err.response?.status === 403) {
          setError("You don't have permission to view this project.");
        } else {
          setError(err.response?.data?.message || "Failed to fetch project details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
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

  if (error || !projectDetails) {
    return (
      <div className="project-page-container">
        <div className="error-state">
          {error || "Project not found"}
          <button onClick={handleBack} className="back-button" style={{ marginTop: "20px" }}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-page-container">
      {/* Header with Invited Badge */}
      <div className="project-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Dashboard
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 className="project-title">{projectDetails.name}</h1>
          <span className="project-status status-pending" style={{ fontSize: "12px", padding: "4px 12px" }}>
            INVITED
          </span>
        </div>
        <p className="project-meta">
          <strong>Client:</strong> {projectDetails.client_name} •
          <strong> Deadline:</strong>{" "}
          {new Date(projectDetails.deadline).toLocaleDateString()}
        </p>
        {projectDetails.description && (
          <p style={{ color: "#6b7280", marginTop: "8px" }}>
            {projectDetails.description}
          </p>
        )}
      </div>

      {/* Note for Invited Users */}
      <div style={{
        background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
        border: "1px solid #fbbf24",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <span style={{ fontSize: "20px" }}>ℹ️</span>
        <div>
          <strong style={{ color: "#78350f" }}>Invited Project</strong>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#92400e" }}>
            You've been invited to collaborate on this project. You can view and contribute to assets.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "assets" ? "active" : ""}`}
            onClick={() => setActiveTab("assets")}
          >
            📁 Assets
          </button>
          <button
            className={`tab ${activeTab === "final" ? "active" : ""}`}
            onClick={() => setActiveTab("final")}
          >
            ✅ Final
          </button>
          <button
            className={`tab ${activeTab === "track" ? "active" : ""}`}
            onClick={() => setActiveTab("track")}
          >
            📊 Track
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "assets" && (
          <div className="assets-section">
            <div className="section-header">
              <h2>Project Assets</h2>
            </div>
            <div className="empty-state">
              No assets uploaded yet
            </div>
          </div>
        )}

        {activeTab === "final" && (
          <div className="final-section">
            <div className="section-header">
              <h2>Final Deliverables</h2>
            </div>
            <div className="empty-state">
              No final deliverables yet
            </div>
          </div>
        )}

        {activeTab === "track" && (
          <div className="track-section">
            <div className="section-header">
              <h2>Project Timeline</h2>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Project Created</h3>
                  <p className="timeline-date">
                    {new Date(projectDetails.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>You were invited</h3>
                  <p className="timeline-date">Recently</p>
                  <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
                    You can now collaborate on this project
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedProjectPage;
