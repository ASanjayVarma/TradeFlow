export type ValidationResult = {
  isValid: boolean;
  message: string;
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) return { isValid: false, message: "Name is required" };
  if (name.length < 2 || name.length > 50)
    return {
      isValid: false,
      message: "Name must be between 2 and 50 characters",
    };
  if (!/^[A-Za-z ]+$/.test(name))
    return {
      isValid: false,
      message: "Name can only contain letters and spaces",
    };
  return { isValid: true, message: "" };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) return { isValid: false, message: "Email is required" };
  if (email.length > 255)
    return { isValid: false, message: "Email must be at most 255 characters" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return { isValid: false, message: "Invalid email format" };
  return { isValid: true, message: "" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim())
    return { isValid: false, message: "Password is required" };
  if (password.length < 8 || password.length > 64)
    return {
      isValid: false,
      message: "Password must be between 8 and 64 characters",
    };
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password))
    return {
      isValid: false,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    };
  return { isValid: true, message: "" };
};
