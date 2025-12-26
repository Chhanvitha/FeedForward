import React from "react";
import "../styles/Dashboard.css";

const LogOut = () => {
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button className="logout-btn" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogOut;
