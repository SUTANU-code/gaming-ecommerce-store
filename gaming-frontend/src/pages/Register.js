import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    if (busy) return;
    setBusy(true);

    try {
      await API.post("/auth/signup", { name, email, password });

      toast.success("Account created — sign in to continue");
      navigate("/login", { replace: true });
    } catch (err) {
      const status = err.response?.status;

      toast.error(
        status === 409 || status === 400
          ? "That email is already registered"
          : "Could not create the account"
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth">
      <form className="auth__card" onSubmit={register}>
        <h1>Create account</h1>
        <p className="auth__sub">It takes about twenty seconds.</p>

        <p className="auth__note">
          Demo store — use a throwaway password, not one you reuse.
        </p>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="register-name"
            style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
          >
            Full name
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label
            htmlFor="register-email"
            style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
          >
            Email
          </label>
          <input
            id="register-email"
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
            htmlFor="register-password"
            style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
          >
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            className="field"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? (
            <>
              <span className="spinner spinner--sm" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>

        <p className="auth__foot">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
