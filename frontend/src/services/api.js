import axios from "axios";

// In production, the frontend and Spring Boot API share one domain.
// During local development, call the backend on port 8080 unless overridden.
const apiBaseUrl = import.meta.env.VITE_API_URL?.trim()
  || (import.meta.env.DEV ? "http://localhost:8080" : "");

const api = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
