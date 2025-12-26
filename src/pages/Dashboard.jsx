import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import LogOut from "../components/LogOut";
import CreateProject from "../components/dashboard/CreateProject";
import DisplayProject from "../components/dashboard/DisplayProject";
import InvitedProjects from "../components/dashboard/InvitedProjects";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, loading } = useCurrentUser();
  const [activeTab, setActiveTab] = useState("my-projects");

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Hey {user?.email?.split('@')[0] || 'Anil'}, manage your projects here
          </p>
        </div>
        <CreateProject />
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === "my-projects" ? "active" : ""}`}
          onClick={() => setActiveTab("my-projects")}
        >
          <span className="tab-icon">📁</span>
          My Projects
        </button>
        <button
          className={`tab ${activeTab === "invited" ? "active" : ""}`}
          onClick={() => setActiveTab("invited")}
        >
          <span className="tab-icon">📬</span>
          Invited Projects
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "my-projects" && <DisplayProject />}
        {activeTab === "invited" && <InvitedProjects />}
      </div>

      <LogOut />
    </div>
  );
};

export default Dashboard;
