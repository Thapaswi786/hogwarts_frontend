import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

function ForgotPassword() {
  const [step, setStep]   = useState(1); // 1=email, 2=otp, 3=new password, 4=done
  const [email, setEmail] = useState("");
  const [otp, setOtp]     = useState("");
  const [newPwd, setNewPwd]   = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Step 1 — send OTP */
  const handleSendOtp = (e) => {
    e.preventDefault();
    setError("");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address."); return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  /* Step 2 — verify OTP (demo: any 6-digit code works) */
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6 || isNaN(otp)) {
      setError("Please enter the 6-digit OTP sent to your email."); return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 800);
  };

  /* Step 3 — set new password */
  const handleResetPwd = (e) => {
    e.preventDefault();
    setError("");
    if (newPwd.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (newPwd !== confirmPwd) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(4); }, 900);
  };

  const StepIndicator = () => (
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
      {[1,2,3].map((s) => (
        <div key={s} style={{
          width: "32px", height: "32px", borderRadius: "50%", display: "grid", placeItems: "center",
          fontSize: "0.82rem", fontWeight: "700",
          background: step > s ? "var(--success)" : step === s ? "linear-gradient(135deg,var(--secondary-light),var(--secondary))" : "rgba(255,255,255,0.1)",
          color: step >= s ? "#111827" : "var(--muted)"
        }}>
          {step > s ? "✓" : s}
        </div>
      ))}
    </div>
  );

  return (
    <main className="page form-wrap">
      <PageTitle title="Forgot Password" />
      <div className="form-card">
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div style={{
            fontSize: "1.8rem", width: "60px", height: "60px", borderRadius: "16px",
            background: "rgba(212,175,55,0.15)", display: "grid", placeItems: "center", margin: "0 auto 12px"
          }}>🔐</div>
          <h2>Reset Password</h2>
          <p>{step === 1 && "Enter your registered email to receive a reset OTP."}
             {step === 2 && `OTP sent to ${email}. Enter it below.`}
             {step === 3 && "Set your new password."}
             {step === 4 && "Password reset successful!"}</p>
        </div>

        {step < 4 && <StepIndicator />}
        {error && <div className="alert alert-error">{error}</div>}

        {step === 1 && (
          <form onSubmit={handleSendOtp} noValidate>
            <div className="form-group">
              <label>Registered Email Address <span style={{ color: "var(--secondary)" }}>*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
            </div>
            <button type="submit" className="main-btn" disabled={loading}>
              {loading ? "Sending OTP…" : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} noValidate>
            <div className="form-group">
              <label>Enter 6-digit OTP <span style={{ color: "var(--secondary)" }}>*</span></label>
              <input
                type="text" maxLength="6" value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="_ _ _ _ _ _"
                style={{ letterSpacing: "6px", textAlign: "center", fontSize: "1.4rem" }}
              />
              <span style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "6px", display: "block" }}>
                Demo: any 6-digit number works.
              </span>
            </div>
            <button type="submit" className="main-btn" disabled={loading}>
              {loading ? "Verifying…" : "Verify OTP"}
            </button>
            <button type="button" className="main-btn" style={{ marginTop: "10px", background: "transparent", border: "1px solid var(--border)", color: "var(--muted)" }}
              onClick={() => setStep(1)}>
              ← Change Email
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPwd} noValidate>
            <div className="form-group">
              <label>New Password <span style={{ color: "var(--secondary)" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPwd ? "text" : "password"} value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Minimum 8 characters" style={{ paddingRight: "48px" }}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  style={{ position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:"1rem" }}>
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm New Password <span style={{ color: "var(--secondary)" }}>*</span></label>
              <input type={showPwd ? "text" : "password"} value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)} placeholder="Re-enter new password" />
            </div>
            <button type="submit" className="main-btn" disabled={loading}>
              {loading ? "Resetting…" : "Reset Password"}
            </button>
          </form>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
            <p style={{ marginBottom: "22px" }}>
              Your password has been reset successfully. You can now log in with your new password.
            </p>
            <Link to="/login" className="main-btn" style={{ textDecoration: "none", display: "block", textAlign: "center" }}>
              Go to Login
            </Link>
          </div>
        )}

        {step === 1 && (
          <p style={{ textAlign: "center", marginTop: "18px", fontSize: "0.9rem", color: "var(--muted)" }}>
            Remembered your password?{" "}
            <Link to="/login" style={{ color: "var(--secondary-light)", textDecoration: "none" }}>Sign In</Link>
          </p>
        )}
      </div>
    </main>
  );
}

export default ForgotPassword;
