import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import PageTitle from "../components/PageTitle";

const DEPARTMENTS = [
  "Computer Science", "Electronics", "Mechanical",
  "Civil", "Electrical", "Information Technology",
];

function Register() {
  const [accountType, setAccountType] = useState("student");
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    phone: "", registerNumber: "", employeeId: "",
    department: "", semester: "1", subject: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error("Passwords do not match"); return; }
    setLoading(true);

    const payload = {
      name: form.name, email: form.email,
      password: form.password, confirmPassword: form.confirmPassword,
      role: accountType, phone: form.phone, department: form.department,
    };

    if (accountType === "student") {
      payload.registerNumber = form.registerNumber;
      payload.semester = parseInt(form.semester, 10);
    } else {
      payload.employeeId = form.employeeId;
      payload.subject = form.subject;
    }

    const result = await register(payload);
    if (result.success) {
      toast.success(result.message || "Registration submitted! Awaiting admin approval.");
      navigate("/login");
    } else {
      toast.error(result.error || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <main className="page form-wrap">
      <PageTitle title="Register" />


      <div className="form-card" style={{ maxWidth: "520px" }}>
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <div style={{
            fontSize: "2rem", width: "62px", height: "62px", borderRadius: "16px",
            background: "linear-gradient(135deg,var(--secondary-light,#f0d060),var(--secondary,#D4AF37))",
            display: "grid", placeItems: "center", margin: "0 auto 12px"
          }}>
            📝
          </div>
          <h2>Create Account</h2>
          <p style={{ color: "var(--muted,#9ca3af)", marginTop: "4px" }}>
            Register as Student or Teacher
          </p>
        </div>

        <div className="role-tabs">
          {["student", "teacher"].map((r) => (
            <button
              key={r} type="button"
              className={accountType === r ? "active" : ""}
              onClick={() => setAccountType(r)}
            >
              {r === "student" ? "🎓" : "👨"} {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="reg-name">Full Name<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
            <input id="reg-name" name="name" type="text" value={form.name} onChange={handleChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="reg-email">Email Address<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
            <input id="reg-email" name="email" type="email" value={form.email} onChange={handleChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="reg-phone">Phone Number</label>
            <input id="reg-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} disabled={loading} />
          </div>

          {accountType === "student" ? (
            <>
              <div className="form-group">
                <label htmlFor="reg-registerNumber">Register Number<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
                <input id="reg-registerNumber" name="registerNumber" type="text" value={form.registerNumber} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="reg-semester">
                  Semester <span style={{ color: "var(--secondary,#D4AF37)" }}>*</span>
                </label>
                <select id="reg-semester" name="semester" value={form.semester}
                  onChange={handleChange} required disabled={loading}>
                  {[1,2,3,4,5,6,7,8].map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="reg-employeeId">Employee ID<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
                <input id="reg-employeeId" name="employeeId" type="text" value={form.employeeId} onChange={handleChange} required disabled={loading} />
              </div>
              <div className="form-group">
                <label htmlFor="reg-subject">Subject<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
                <input id="reg-subject" name="subject" type="text" value={form.subject} onChange={handleChange} required disabled={loading} />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="reg-department">
              Department <span style={{ color: "var(--secondary,#D4AF37)" }}>*</span>
            </label>
            <select id="reg-department" name="department" value={form.department}
              onChange={handleChange} required disabled={loading}>
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Password<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
            <input id="reg-password" name="password" type="password" value={form.password} onChange={handleChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="reg-confirmPassword">Confirm Password<span style={{ color: "var(--secondary,#D4AF37)" }}> *</span></label>
            <input id="reg-confirmPassword" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} required disabled={loading} />
          </div>

          <button type="submit" className="main-btn" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "0.9rem", color: "var(--muted,#9ca3af)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--secondary,#D4AF37)", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
        <div style={{ width: "100%", maxWidth: "520px", marginBottom: "12px" }}>
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "var(--secondary,#D4AF37)", textDecoration: "none",
          fontSize: "0.9rem", fontWeight: "600"
        }}>
          ← Back to Home
        </a>
      </div>
      </div>
    </main>
  );
}

export default Register;
