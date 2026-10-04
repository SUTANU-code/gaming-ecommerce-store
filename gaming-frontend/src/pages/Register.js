import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios"; 

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/signup", {
        name,
        email,
        password
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join GameStore</p>

        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "15px" }}>
          Demo project. Please use a test password, not one you use elsewhere.
        </p>

        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Enter Name"
          style={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={register}>
          Register
        </button>

        <p style={styles.text}>
          Already have an account?
          <Link style={styles.link} to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827"
  },

  card: {
    width: "350px",
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
    textAlign: "center"
  },

  title: {
    marginBottom: "10px"
  },

  subtitle: {
    marginBottom: "25px",
    color: "gray"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },

  text: {
    marginTop: "15px"
  },

  link: {
    marginLeft: "5px",
    color: "blue",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Register;
