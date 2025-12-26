import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InvitedProjectApi } from "../../api/dashboard/invitedProject";
import "../../styles/Dashboard.css";

const InvitedProjects = () => {
  const [invitedProjects, setInvitedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await InvitedProjectApi({token});

        setInvitedProjects(response?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}?invited=true`);
  };

  if (loading) {
    return <div className="loading-state">Loading invited projects...</div>;
  }

  if (invitedProjects.length === 0) {
    return <div className="empty-state">No invited projects yet</div>;
  }

  return (
    <div className="projects-grid">
      {invitedProjects.map((item) => (
        <div 
          key={item.project_id} 
          className="project-card"
          onClick={() => handleCardClick(item.project_id)}
          style={{ cursor: "pointer" }}
        >
          <div className="project-card-header">
            <h3 className="project-card-title">{item.projects?.name}</h3>
            <span className="project-status status-pending">INVITED</span>
          </div>
          
          <p className="project-description">
            {item.projects?.description || "No description provided"}
          </p>
          
          <div className="project-client">
            <strong>Deadline:</strong>{" "}
            {item.projects?.deadline 
              ? new Date(item.projects.deadline).toLocaleDateString() 
              : "Not set"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvitedProjects;
