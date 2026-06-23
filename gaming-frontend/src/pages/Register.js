import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    setLoading(true);
    try {
      await API.post("/auth/signup", { name, email, password });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") register();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LOGO */}
        <div style={styles.logoWrap}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>GAME<span style={styles.logoGreen}>STORE</span></span>
        </div>

        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Join the GameStore community</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Full name</label>
          <input
            type="text"
            placeholder="John Doe"
            style={styles.input}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

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
          onClick={register}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link style={styles.link} to="/login">Sign in</Link>
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
    boxSizing: "border-box"
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

export default Register;