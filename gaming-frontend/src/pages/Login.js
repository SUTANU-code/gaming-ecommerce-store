import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {

  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigation hook
  const navigate = useNavigate();

  // Login function
  const login = async () => {

    try {

      // API request
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful");

      // Redirect to products page
      navigate("/");

    } catch (err) {

      console.log(err);

     toast.error("login failed");
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>GameStore</h1>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button style={styles.button} onClick={login}>
          Login
        </button>

        {/* REGISTER LINK */}
        <p style={styles.text}>
          Don't have an account?

          <Link style={styles.link} to="/register">
            Register
          </Link>
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

export default Login;