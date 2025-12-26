import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProjects } from "../../api/dashboard/dashboardAPI";
import DeleteProject from "./DeleteProject";
import "../../styles/Dashboard.css";

const DisplayProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const res = await fetchAllProjects(token);
        setProjects(res.data || []);
      } catch (err) {
        console.error("Fetch projects error:", err);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectDelete = (deletedId) => {
    setProjects((prev) => prev.filter((project) => project.id !== deletedId));
  };

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return <div className="loading-state">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        No projects found. Create your first project!
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-card"
          onClick={() => handleCardClick(project.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="project-card-header">
            <h3 className="project-card-title">{project.name}</h3>
            <div
              className="project-card-actions"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={`project-status ${
                  index % 2 === 0 ? "status-progress" : "status-pending"
                }`}
              >
                {index % 2 === 0 ? "Progress" : "Pending"}
              </span>
              <DeleteProject id={project.id} onDelete={handleProjectDelete} />
            </div>
          </div>

          <p className="project-description">
            {project.description ||
              "Complete overhaul of the company website to improve user experience and conversion rates. Focus on modern aesthetics and mobile responsiveness."}
          </p>

          <div className="project-client">
            <strong>Client:</strong> {project.client_name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayProject;
