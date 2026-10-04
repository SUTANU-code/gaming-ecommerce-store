import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    if (busy) return;
    setBusy(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Welcome back");
      navigate("/", { replace: true });
    } catch (err) {
      const status = err.response?.status;

      toast.error(
        status === 401
          ? "That email and password do not match"
          : "Could not sign in. Try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={login}>
        <h1>Sign in</h1>
        <p className="auth__sub">Access your cart and order history.</p>

        <p className="auth__note">
          Demo store — use a throwaway password, not one you reuse.
        </p>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="login-email"
            style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
          >
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="login-password"
            style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
          >
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? (
            <>
              <span className="spinner spinner--sm" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="auth__foot">
          New to GameStore? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
