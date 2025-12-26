import { useState } from "react";
import { sendInvite } from "../../api/ProjectPage/sendInvite";
import "../../styles/ProjectPage.css";

const Invite = ({ projectID }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await sendInvite({
        email,
        token,
        projectId: projectID,
      });

      setEmail("");
      setMessage({ type: "success", text: "Invite sent successfully!" });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to send invite" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      marginBottom: "32px", 
      padding: "32px 36px",
      background: "linear-gradient(135deg, #ffffff 0%, #fafbff 100%)",
      borderRadius: "24px",
      boxShadow: "0 8px 32px rgba(111, 63, 245, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)",
      border: "1px solid rgba(111, 63, 245, 0.06)"
    }}>
      <h3 style={{ 
        fontSize: "20px", 
        fontWeight: "700", 
        marginBottom: "16px",
        color: "#1a1a1a",
        letterSpacing: "-0.01em"
      }}>
        Invite Team Member
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <input
            type="email"
            className="form-input"
            placeholder="Enter teammate email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ margin: 0 }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className="btn-submit"
          style={{ margin: 0 }}
        >
          {loading ? "Inviting..." : "Send Invite"}
        </button>
      </form>

      {message.text && (
        <div style={{
          marginTop: "16px",
          padding: "12px 16px",
          borderRadius: "10px",
          fontSize: "14px",
          fontWeight: "600",
          background: message.type === "success" 
            ? "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)" 
            : "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          color: message.type === "success" ? "#065f46" : "#dc2626",
          border: `1px solid ${message.type === "success" ? "#6ee7b7" : "#fca5a5"}`
        }}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default Invite;
