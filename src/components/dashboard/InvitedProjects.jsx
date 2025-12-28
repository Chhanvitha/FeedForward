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

        console.log("Invited Projects API Response:", response?.data?.data);
        
        // Log each project's structure
        response?.data?.data?.forEach((item, index) => {
          console.log(`Project ${index}:`, {
            project_id: item.project_id,
            projects_id: item.projects?.id,
            full_item: item
          });
        });

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
    console.log("Navigating to project with ID:", projectId);
    if (!projectId) {
      console.error("Project ID is undefined!");
      return;
    }
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
          key={item.id || item.project_id} 
          className="project-card"
          onClick={() => handleCardClick(item.id)}
          style={{ cursor: "pointer" }}
        >
          <div className="project-card-header">
            <h3 className="project-card-title">{item.name}</h3>
            <span className="project-status status-pending">INVITED</span>
          </div>
          
          <p className="project-description">
            {item.description || "No description provided"}
          </p>
          
          <div className="project-client">
            <strong>Deadline:</strong>{" "}
            {item.deadline 
              ? new Date(item.deadline).toLocaleDateString() 
              : "Not set"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvitedProjects;
