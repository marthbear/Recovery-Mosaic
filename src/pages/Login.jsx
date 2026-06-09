import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ADMIN_EMAIL = "admin@recoverymosaic.org";
const ADMIN_PASSWORD = "RecoveryMosaic2025";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    sessionStorage.setItem("adminAuth", "true");
    navigate("/admin");
  }

  return (
    <div className="page login-page">
      <div className="login-card">
        <h2 className="login-heading">Admin Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="login-input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="login-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
