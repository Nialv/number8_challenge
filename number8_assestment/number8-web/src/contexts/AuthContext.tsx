import React, { createContext, useState, useEffect } from "react";
import jsCookie from "js-cookie";
import { AuthContextType, ProviderProps } from "@interfaces/context";
import { authenticateUser } from "@services/authServices";

export const AuthContext = createContext<AuthContextType | undefined>({
  token: "",
  authenticate: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const authenticate = async (username: string, password: string) => {
    try {
      const newToken = await authenticateUser(username, password);
      setIsAuthenticated(true);
      setToken(newToken);
      jsCookie.set("token", newToken);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    jsCookie.remove("token");
  };

  useEffect(() => {
    const initialToken = jsCookie.get("token");

    if (initialToken) {
      setToken(initialToken);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
