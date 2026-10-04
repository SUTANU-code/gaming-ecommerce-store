import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://gaming-ecommerce-store-8.onrender.com/api",
});

/* Attach the JWT to every request. */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

/* Send the user to the login page when a protected call comes back
   unauthorised. Without the guard below, a wrong password on /auth/login
   also returns 401, which would bounce the user off the login form
   instead of showing the inline error. */
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    const isAuthCall =
      url.includes("/auth/login") ||
      url.includes("/auth/signup") ||
      url.includes("/auth/create-admin");

    if ((status === 401 || status === 403) && !isAuthCall) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
