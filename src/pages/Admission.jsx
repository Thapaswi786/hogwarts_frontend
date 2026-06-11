import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

const steps = [
  { title: "Online Application", desc: "Fill and submit the online admission form with your personal and academic details." },
  { title: "Document Upload", desc: "Upload mark sheets, ID proof, transfer certificate, and passport photo." },
  { title: "Application Review", desc: "Our admissions team reviews your application within 3–5 working days." },
  { title: "Counseling / Merit Selection", desc: "Seat confirmation via counseling session or merit-based ranking." },
  { title: "Fee Payment & Enrollment", desc: "Pay the admission fee and complete enrollment to confirm your seat." },
];

// Defined outside component to prevent re-mount on every render (fixes cursor loss)
const F = ({ label, name, type = "text", options, placeholder, required, value, onChange, error }) => (
  <div className="form-group">
    <label>{label}{required && <span style={{ color: "var(--secondary)" }}> *</span>}</label>
    {options ? (
      <select name={name} value={value} onChange={onChange}>
        <option value="">-- Select --</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    )}
    {error && <span className="error-text">{error}</span>}
  </div>
);

function Admission() {
  const [form, setForm] = useState({
    fullName: "", dob: "", gender: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "",
    course: "", prevSchool: "", percentage: "", board: "",
    category: "", parentName: "", parentPhone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (!form.gender) e.gender = "Please select gender.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email.";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter a valid 10-digit phone number.";
    if (!form.course) e.course = "Please select a course.";
    if (!form.percentage || isNaN(form.percentage) || form.percentage < 0 || form.percentage > 100)
      e.percentage = "Enter a valid percentage (0–100).";
    if (!form.parentName.trim()) e.parentName = "Parent/Guardian name is required.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="page form-wrap">
        <PageTitle title="Admission" />
        <div className="form-card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>✅</div>
          <h2>Application Submitted!</h2>
          <p style={{ marginTop: "12px" }}>
            Thank you, <strong style={{ color: "var(--secondary)" }}>{form.fullName}</strong>!
            Your admission application has been received. We will contact you at{" "}
            <strong style={{ color: "var(--secondary)" }}>{form.email}</strong> within 3–5
            working days.
          </p>
          <button
            className="main-btn"
            style={{ marginTop: "24px" }}
            onClick={() => { setSubmitted(false); setForm({ fullName:"",dob:"",gender:"",email:"",phone:"",address:"",city:"",state:"",pincode:"",course:"",prevSchool:"",percentage:"",board:"",category:"",parentName:"",parentPhone:"" }); }}
          >
            Submit Another Application
          </button>
        </div>
      </main>
    );
  }

  const field = (props) => (
    <F {...props} value={form[props.name]} onChange={handleChange} error={errors[props.name]} />
  );

  return (
    <main className="page">
      <PageTitle title="Admission" />

      <h1 className="section-title">Admission 2025–26</h1>
      <p className="section-subtitle">
        Apply for undergraduate and postgraduate engineering programs. Fill in the form
        carefully — all starred fields are mandatory.
      </p>

      {/* Steps */}
      <section className="section-block">
        <div className="content-card" style={{ maxWidth: "760px", margin: "0 auto" }}>
          <h3 style={{ marginBottom: "20px" }}>Admission Process</h3>
          {steps.map((s, i) => (
            <div className="step-item" key={i}>
              <div className="step-badge">{i + 1}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="section-block form-wrap" style={{ minHeight: "unset" }}>
        <div className="form-card form-card-wide">
          <h2 style={{ marginBottom: "6px" }}>Online Application Form</h2>
          <p>Academic Year 2025–26</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Personal Details */}
            <h3 style={{ color: "var(--secondary)", margin: "20px 0 14px", fontSize: "1.1rem" }}>Personal Details</h3>
            <div className="grid-2">
              {field({ label: "Full Name", name: "fullName", placeholder: "As per school records", required: true })}
              {field({ label: "Date of Birth", name: "dob", type: "date", required: true })}
            </div>
            <div className="grid-2">
              {field({ label: "Gender", name: "gender", options: ["Male", "Female", "Other"], required: true })}
              {field({ label: "Category", name: "category", options: ["General / OC", "BC", "MBC", "SC", "ST"] })}
            </div>

            {/* Contact */}
            <h3 style={{ color: "var(--secondary)", margin: "20px 0 14px", fontSize: "1.1rem" }}>Contact Details</h3>
            <div className="grid-2">
              {field({ label: "Email Address", name: "email", type: "email", placeholder: "your@email.com", required: true })}
              {field({ label: "Phone Number", name: "phone", type: "tel", placeholder: "10-digit mobile number", required: true })}
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address" rows="2" value={form.address}
                onChange={handleChange} placeholder="Door No, Street, Locality"
                style={{ width:"100%", padding:"13px 15px", borderRadius:"14px", border:"1px solid var(--border)", background:"rgba(255,255,255,0.07)", color:"var(--white)", outline:"none", resize:"vertical" }}
              />
            </div>
            <div className="grid-3">
              {field({ label: "City / Town", name: "city", placeholder: "City" })}
              {field({ label: "State", name: "state", options: ["Tamil Nadu","Kerala","Karnataka","Andhra Pradesh","Telangana","Maharashtra","Other"] })}
              {field({ label: "PIN Code", name: "pincode", placeholder: "6-digit PIN" })}
            </div>

            {/* Academic */}
            <h3 style={{ color: "var(--secondary)", margin: "20px 0 14px", fontSize: "1.1rem" }}>Academic Details</h3>
            <div className="grid-2">
              {field({ label: "Course Applied For", name: "course", required: true, options: [
                "B.E. Computer Science and Engineering",
                "B.E. Electronics and Communication Engineering",
                "B.E. Electrical and Electronics Engineering",
                "B.E. Mechanical Engineering",
                "B.Tech Information Technology",
                "M.E. Computer Science and Engineering",
                "M.E. VLSI Design",
                "M.Tech Artificial Intelligence and Data Science",
                "M.E. Power Systems Engineering",
              ]})}
              {field({ label: "Previous School / College", name: "prevSchool", placeholder: "Name of institution" })}
            </div>
            <div className="grid-2">
              {field({ label: "12th / UG Percentage (%)", name: "percentage", type: "number", placeholder: "e.g. 87.5", required: true })}
              {field({ label: "Board / University", name: "board", options: [
                "Tamil Nadu State Board", "CBSE", "ICSE", "Anna University", "Other University"
              ]})}
            </div>

            {/* Parent */}
            <h3 style={{ color: "var(--secondary)", margin: "20px 0 14px", fontSize: "1.1rem" }}>Parent / Guardian Details</h3>
            <div className="grid-2">
              {field({ label: "Parent / Guardian Name", name: "parentName", placeholder: "Full name", required: true })}
              {field({ label: "Parent / Guardian Phone", name: "parentPhone", type: "tel", placeholder: "10-digit mobile number" })}
            </div>

            <button type="submit" className="main-btn" style={{ marginTop: "10px" }}>
              Submit Admission Application
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Admission;
