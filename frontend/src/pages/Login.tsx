import React, { useState } from "react";
import InputField from "../components/InputField";
import { useValidation } from "../hooks/useValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";
import { api } from "../utilities/api"; // Import API functions

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { errors, validateField } = useValidation();
  const { setToken, setUsername } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    validateField("email", email);
    validateField("password", password);

    if (!errors.email && !errors.password) {
      setLoading(true);
      try {
        const response = await api.login({ email, password }); // Send login request
        setToken(response.token);
        setUsername(response.username);
        alert("Login successful!");
      } catch (error) {
        setApiError(error instanceof Error ? error.message : "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-white text-black">
      <div
        className="shadow-sm rounded"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center py-2 bg-white">
          <h2 className="d-inline-block px-3 py-1 text-primary rounded">
            Login
          </h2>
        </div>
        <div className="px-3 pb-3">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              error={errors.password}
            />
            {apiError && <p className="text-danger">{apiError}</p>}
            <button
              className="btn btn-primary w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
