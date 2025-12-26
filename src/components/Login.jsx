import "../styles/SignIn.css";
import logo from "../landingpage/Main_logo.png";
import { useNavigate } from "react-router-dom";

const Login = ({
  email,
  password,
  onChange,
  onSubmit,
  error,
}) => {
    const navigate = useNavigate();
    
  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-logo">
          <img src={logo} alt="FeedForward" />
          
        </div>

        <h2 className="signin-title">
          Welcome to FeedForward !
        </h2>

        <div className="signin-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="ram@gmail.com"
          />
        </div>

        <div className="signin-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="**********"
          />
        </div>

        {error && (
          <div className="error-message" style={{ marginTop: "16px" }}>
            {error}
          </div>
        )}

        <button className="signin-btn" onClick={onSubmit}>
          Login
        </button>

        <p className="signin-footer">
          Don't have an account? 
          <span
           onClick={() => navigate("/signin")}
          >
           signin
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
