import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { signInUser } from "../api/authAPI";

const LoginContainer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await signInUser({
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard");
      return response;
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Login
      email={form.email}
      password={form.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginContainer;
