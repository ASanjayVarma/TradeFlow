import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  ValidationResult,
} from "../utilities/validation";

export const useValidation = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let result: ValidationResult;
    switch (name) {
      case "email":
        result = validateEmail(value);
        break;
      case "password":
        result = validatePassword(value);
        break;
      default:
        return;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: result.isValid ? "" : result.message,
    }));
  };

  return { errors, validateField };
};
