import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api/auth";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    const token = response.data.token;
    setToken(token);
    return token;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  removeToken();
};

export const setToken = (token: string): void => {
  Cookies.set("token", token);
};

export const removeToken = (): void => {
  Cookies.remove("token");
};
