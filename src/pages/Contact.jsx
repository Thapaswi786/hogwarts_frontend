import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim() || form.message.length < 20) e.message = "Message must be at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSent(true);
  };

  const contactItems = [
    { icon: "📍", title: "Address", detail: "Hogwarts University, Anna Nagar, Madurai – 625 020, Tamil Nadu, India." },
    { icon: "📞", title: "Phone", detail: "+91 98765 43210 | +91 98765 43211" },
    { icon: "📧", title: "Email", detail: "info@hogwartsuniversity.edu.in" },
    { icon: "🕐", title: "Office Hours", detail: "Mon – Fri: 9:00 AM – 5:00 PM\nSat: 9:00 AM – 1:00 PM" },
  ];

  const departments = [
    { dept: "Admissions Office", contact: "admissions@hogwartsuniversity.edu.in" },
    { dept: "Examination Cell", contact: "exams@hogwartsuniversity.edu.in" },
    { dept: "Placement Cell", contact: "placements@hogwartsuniversity.edu.in" },
    { dept: "Hostel Office", contact: "hostel@hogwartsuniversity.edu.in" },
    { dept: "Finance / Fees", contact: "fees@hogwartsuniversity.edu.in" },
    { dept: "Technical Support", contact: "it@hogwartsuniversity.edu.in" },
  ];

  return (
    <main className="page">
      <PageTitle title="Contact Us" />

      <h1 className="section-title">Contact Us</h1>
      <p className="section-subtitle">
        We're here to help. Reach out to us for admissions, academics, placement,
        or any other queries.
      </p>

      <div className="contact-grid">
        {/* Left – Info */}
        <div>
          <div className="content-card" style={{ marginBottom: "22px" }}>
            <h3>Get in Touch</h3>
            <div style={{ marginTop: "20px" }}>
              {contactItems.map((item) => (
                <div className="contact-info-item" key={item.title}>
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card">
            <h3>Department Contacts</h3>
            <div style={{ marginTop: "14px" }}>
              {departments.map((d) => (
                <div key={d.dept} style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ color: "var(--white)", fontWeight: "600", fontSize: "0.93rem", marginBottom: "3px" }}>{d.dept}</p>
                  <p style={{ fontSize: "0.88rem" }}>{d.contact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right – Form */}
        <div>
          {sent ? (
            <div className="form-card" style={{ textAlign: "center", padding: "44px 28px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
              <h2>Message Sent!</h2>
              <p style={{ marginTop: "12px" }}>
                Thank you for reaching out. Our team will reply to{" "}
                <strong style={{ color: "var(--secondary)" }}>{form.email}</strong> within
                24–48 hours.
              </p>
              <button className="main-btn" style={{ marginTop: "22px" }} onClick={() => { setSent(false); setForm({ name:"",email:"",subject:"",message:"" }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="form-card">
              <h2 style={{ marginBottom: "20px" }}>Send Us a Message</h2>
              <form onSubmit={handleSubmit} noValidate>
                {[
                  { label: "Your Name", name: "name", type: "text", placeholder: "Full Name" },
                  { label: "Email Address", name: "email", type: "email", placeholder: "your@email.com" },
                  { label: "Subject", name: "subject", type: "text", placeholder: "How can we help?" },
                ].map(({ label, name, type, placeholder }) => (
                  <div className="form-group" key={name}>
                    <label>{label} <span style={{ color: "var(--secondary)" }}>*</span></label>
                    <input type={type} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} />
                    {errors[name] && <span className="error-text">{errors[name]}</span>}
                  </div>
                ))}
                <div className="form-group">
                  <label>Message <span style={{ color: "var(--secondary)" }}>*</span></label>
                  <textarea
                    name="message" rows="5" value={form.message} onChange={handleChange}
                    placeholder="Describe your query in detail..."
                    style={{ width:"100%", padding:"13px 15px", borderRadius:"14px", border:"1px solid var(--border)", background:"rgba(255,255,255,0.07)", color:"var(--white)", outline:"none", resize:"vertical" }}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
                <button type="submit" className="main-btn">Send Message</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Contact;
