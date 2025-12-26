import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/Dashboard.css";

const UpdateProject = ({ project, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(project?.name || "");
  const [clientName, setClientName] = useState(project?.client_name || "");
  const [endDate, setEndDate] = useState(project?.deadline ? new Date(project.deadline) : null);
  const [description, setDescription] = useState(project?.description || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // TODO: Implement update API call
      console.log("Updating project:", {
        projectName,
        clientName,
        endDate,
        description
      });

      // Call onUpdate callback if provided
      if (onUpdate) {
        onUpdate({
          ...project,
          name: projectName,
          client_name: clientName,
          deadline: endDate,
          description
        });
      }

      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpen = () => {
    // Reset form to current project values
    setProjectName(project?.name || "");
    setClientName(project?.client_name || "");
    setEndDate(project?.deadline ? new Date(project.deadline) : null);
    setDescription(project?.description || "");
    setError("");
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="delete-btn"
        onClick={handleOpen}
        style={{ 
          background: "linear-gradient(135deg, #6f3ff5 0%, #5a2fd6 100%)",
          marginRight: "8px"
        }}
        title="Edit Project"
      >
        ✏️
      </button>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => !isSubmitting && setIsModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">✏️</div>
              <h2 className="modal-title">Update Project</h2>
            </div>
            <p className="modal-subtitle">
              Update your project details and keep track of changes.
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
                    placeholder="Client Name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="Select deadline"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  required
                />
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProject;
