import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// ✅ Attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🔥 AUTO REDIRECT ON 401 / 403
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // ❌ Not authorized → redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;