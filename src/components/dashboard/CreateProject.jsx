import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Dashboard.css";
import { createProject } from "../../api/dashboard/dashboardAPI";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const CreateProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, loading } = useCurrentUser();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const userId = user?.id;

      if (!userId || !token) {
        setError("User not authenticated. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const response = await createProject({
        projectName,
        clientName,
        endDate,
        description,
        userId,
        token,
      });
      
      console.log(response);
      
      // Reset form
      setProjectName("");
      setClientName("");
      setStartDate(null);
      setEndDate(null);
      setDescription("");
      
      // Close modal with animation
      setIsModalOpen(false);
      
      // Wait for modal close animation to complete before reload
      setTimeout(() => {
        window.location.reload();
      }, 300);
      
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create project. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="create-project-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Create new project
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => !isSubmitting && setIsModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">📁</div>
              <h2 className="modal-title">Create New Project</h2>
            </div>
            <p className="modal-subtitle">
              Create a project that unifies your assets and turns client changes
              into actions.
            </p>

            <hr className="modal-divider" />

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Name of the Project"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Kiran"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setEndDate(null);
                    }}
                    placeholderText="Select"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="Select"
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate}
                    disabled={!startDate}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project description"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting ? "Creating..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProject;
