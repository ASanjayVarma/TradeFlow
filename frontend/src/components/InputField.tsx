import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Using Lucide icons for a modern look

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-2 position-relative">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          className={`form-control ${error ? "is-invalid" : ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-danger small mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
