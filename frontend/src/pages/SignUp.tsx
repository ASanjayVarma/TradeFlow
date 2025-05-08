import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "../utilities/validation";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../utilities/api";

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // 👈 Initialize navigate

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiResponse, setApiResponse] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const usernameValidation = validateName(username);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation =
      password === confirmPassword
        ? { isValid: true, message: "" }
        : { isValid: false, message: "Passwords do not match" };

    setErrors({
      username: usernameValidation.message,
      email: emailValidation.message,
      password: passwordValidation.message,
      confirmPassword: confirmPasswordValidation.message,
    });

    if (
      usernameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid
    ) {
      try {
        setLoading(true);
        const data = await api.signup({
          name: username,
          email,
          password,
        });
        setApiResponse({ message: data.message, isError: false });

        // 👇 Redirect after successful signup
        setTimeout(() => {
          navigate("/login");
        }, 1500); // small delay so user can see the success message
      } catch (error) {
        setApiResponse({
          message: error instanceof Error ? error.message : "Signup failed.",
          isError: true,
        });
      } finally {
        setLoading(false);
        setTimeout(() => setApiResponse(null), 3000);
      }
    } else {
      setApiResponse({
        message: "Please fix the errors above.",
        isError: true,
      });
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
            Sign Up
          </h2>
        </div>
        <div className="px-3 pb-3">
          <form onSubmit={handleSubmit}>
            {apiResponse && (
              <div
                className={`mb-2 text-center ${
                  apiResponse.isError ? "text-danger" : "text-success"
                }`}
              >
                <p>{apiResponse.message}</p>
              </div>
            )}
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
            <InputField
              label="Re-enter Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              className="btn btn-primary w-100 mt-2"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
