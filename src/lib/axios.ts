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

// Add response interceptors with detailed logging and 401 session expiry handling
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

    // If API returns 401 (token expired/invalid), clear token and redirect admin to login
    if (error.response?.status === 401) {
      try {
        const { tokenActions } = require("@/store/slices/authSlice");
        store.dispatch(tokenActions.deleteToken());
      } catch (e) {
        console.error("Failed to clear auth state:", e);
      }

      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        window.location.pathname !== "/admin/login"
      ) {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;