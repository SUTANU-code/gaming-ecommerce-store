import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") login();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LOGO */}
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>GAME<span style={styles.logoGreen}>STORE</span></span>
        </div>

        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            style={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          onClick={login}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p style={styles.bottomText}>
          Don't have an account?{" "}
          <Link style={styles.link} to="/register">Create one</Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "24px"
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#0f0f0f",
    border: "1px solid #1a2e1a",
    borderRadius: "16px",
    padding: "40px 36px",
    textAlign: "center"
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "28px"
  },
  logoIcon: { color: "#22c55e", fontSize: "22px" },
  logoText: {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "2px"
  },
  logoGreen: { color: "#22c55e" },
  title: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px"
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "14px",
    marginBottom: "28px"
  },
  fieldGroup: {
    textAlign: "left",
    marginBottom: "16px"
  },
  label: {
    display: "block",
    color: "#9ca3af",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    background: "#111",
    border: "1px solid #1f1f1f",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
    transition: "border-color 0.2s"
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    color: "#000",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "0.5px",
    transition: "opacity 0.2s"
  },
  bottomText: {
    color: "#6b7280",
    fontSize: "13px",
    marginTop: "20px"
  },
  link: {
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: "600"
  }
};

export default Login;