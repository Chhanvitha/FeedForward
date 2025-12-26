import React, { useState } from "react";
import { deleteAPI } from "../../api/dashboard/dashboardAPI";

const DeleteProject = ({ id, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteAPI({ id, token });
      onDelete(id);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="delete-btn"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteProject;
