import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/SignIn";
import { signUp } from "../api/authAPI";

const SigninContainer = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await signUp({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SignIn
      {...form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSignup={isSignup}
      setIsSignup={setIsSignup}
      error={error}
    />
  );
};

export default SigninContainer;
