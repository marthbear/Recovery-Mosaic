import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

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
          <button className="login-button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
