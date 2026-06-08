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

  const Field = ({ label, name, type = "text", required }) => (
    <div className="form-group">
      <label htmlFor={`reg-${name}`}>
        {label}{required && <span style={{ color: "var(--secondary,#D4AF37)" }}> *</span>}
      </label>
      <input
        id={`reg-${name}`} name={name} type={type}
        value={form[name]} onChange={handleChange}
        required={required} disabled={loading}
      />
    </div>
  );

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
              {r === "student" ? "🎓" : "👨🏫"} {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Field label="Full Name"      name="name"  required />
          <Field label="Email Address"  name="email" type="email" required />
          <Field label="Phone Number"   name="phone" type="tel" />

          {accountType === "student" ? (
            <>
              <Field label="Register Number" name="registerNumber" required />
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
              <Field label="Employee ID" name="employeeId" required />
              <Field label="Subject"     name="subject"    required />
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

          <Field label="Password"         name="password"        type="password" required />
          <Field label="Confirm Password" name="confirmPassword" type="password" required />

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
      </div>
    </main>
  );
}

export default Register;
