import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import PageTitle from "../components/PageTitle";

const ROLE_ROUTES = { student: "/student", teacher: "/teacher", admin: "/admin" };

function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      toast.success(`Welcome, ${result.user.name}!`);
      navigate(ROLE_ROUTES[result.user.role] || "/");
    } else {
      toast.error(result.error || "Login failed");
    }
    setLoading(false);
  };

  return (
    <main className="page form-wrap">
      <PageTitle title="Login" />

      <div className="form-card">
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <div style={{
            fontSize: "2.6rem", width: "68px", height: "68px", borderRadius: "18px",
            background: "linear-gradient(135deg,var(--secondary-light,#f0d060),var(--secondary,#D4AF37))",
            display: "grid", placeItems: "center", margin: "0 auto 12px"
          }}>
            🔐
          </div>
          <h2>Portal Login</h2>
          <p style={{ color: "var(--muted,#9ca3af)", marginTop: "4px" }}>
            Sign in to your college portal account
          </p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: "48px" }}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", color: "var(--muted,#9ca3af)",
                  cursor: "pointer", fontSize: "1rem"
                }}
              >
                {showPwd ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <Link to="/forgot-password" style={{ fontSize: "0.9rem", color: "var(--secondary,#D4AF37)", textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="main-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>


        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "0.9rem", color: "var(--muted,#9ca3af)" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "var(--secondary,#D4AF37)", textDecoration: "none" }}>
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
