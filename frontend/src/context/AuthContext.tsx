import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string;
  username: string;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
}

const INVALID_TOKEN = "INVALID_TOKEN";
const SESSION_STORAGE_KEY_TOKEN = "auth_token";
const SESSION_STORAGE_KEY_USERNAME = "auth_username";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string>(INVALID_TOKEN);
  const [username, setUsernameState] = useState<string>("");

  // Initialize from sessionStorage if exists
  useEffect(() => {
    const storedToken = sessionStorage.getItem(SESSION_STORAGE_KEY_TOKEN);
    const storedUsername = sessionStorage.getItem(SESSION_STORAGE_KEY_USERNAME);
    if (storedToken) {
      setTokenState(storedToken);
    }
    if (storedUsername) {
      setUsernameState(storedUsername);
    }
  }, []);

  const setToken = (newToken: string) => {
    setTokenState(newToken);
    if (newToken !== INVALID_TOKEN) {
      sessionStorage.setItem(SESSION_STORAGE_KEY_TOKEN, newToken);
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY_TOKEN);
    }
  };

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    if (newUsername) {
      sessionStorage.setItem(SESSION_STORAGE_KEY_USERNAME, newUsername);
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY_USERNAME);
    }
  };

  const logout = () => {
    setToken(INVALID_TOKEN);
    setUsername("");
  };

  const isLoggedIn = () => token !== INVALID_TOKEN;

  return (
    <AuthContext.Provider
      value={{ token, username, setToken, setUsername, isLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
