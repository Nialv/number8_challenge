import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:3000/api";

const axiosPrivateInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosPrivateInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosPrivateInstance;
