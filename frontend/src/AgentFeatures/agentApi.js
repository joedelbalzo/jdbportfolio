import axios from "axios";

// Shared client for all /api/agent requests: attaches the JWT and
// re-runs OAuth when it expires, so components don't handle auth.
const agentApi = axios.create({ baseURL: "/api/agent" });

agentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("agentToken");
  if (token) config.headers.Authorization = token;
  return config;
});

agentApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("agentToken");
      window.location.href = "/api/agent/auth/google";
    }
    return Promise.reject(error);
  }
);

export default agentApi;
