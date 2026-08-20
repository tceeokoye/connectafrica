import Axios from "axios";
import store from "@/store"; // your Redux store

// Use relative base URL so browser automatically calls the current host (localhost in dev, domain in prod)
const axiosInstance = Axios.create({
  baseURL: "",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Attach token from Redux to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.token?.token; // adjust if your slice is named differently
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `📤 [${config.method?.toUpperCase()}] ${config.baseURL || ""}${config.url}`,
      config.data
    );
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptors with detailed logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      `✅ Response [${response.status}] ${response.config.url}:`,
      response.data
    );
    return response;
  },
  (error) => {
    console.error("❌ Axios Error:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;