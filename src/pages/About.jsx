import React from "react";
import PageTitle from "../components/PageTitle";

function About() {
  return (
    <main className="page">
      <PageTitle title="About Us" />

      <h1 className="section-title">About Hogwarts University</h1>
      <p className="section-subtitle">
        Established in 1998, Hogwarts University has grown into one of the most respected
        engineering institutions, shaping thousands of engineers who lead industries worldwide.
      </p>

      <section className="section-block">
        <div className="grid-3">
          <div className="content-card">
            <h3>🎯 Our Vision</h3>
            <p>
              To become a globally recognized center of excellence in engineering and technology
              education that nurtures skilled, ethical, and innovative professionals equipped
              to solve the challenges of tomorrow.
            </p>
          </div>
          <div className="content-card">
            <h3>🚀 Our Mission</h3>
            <p>
              To deliver high-quality technical education through hands-on laboratory practice,
              project-based learning, strong industry collaboration, research culture, and
              placement-focused career development.
            </p>
          </div>
          <div className="content-card">
            <h3>💡 Core Values</h3>
            <ul>
              <li>Academic Integrity &amp; Excellence</li>
              <li>Innovation and Critical Thinking</li>
              <li>Inclusivity and Student Welfare</li>
              <li>Industry-Ready Skill Development</li>
              <li>Ethical and Responsible Engineering</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Our History</h2>
        <p className="section-subtitle">A journey of growth, excellence, and impact since 1998.</p>
        <div className="grid-2">
          <div className="content-card">
            <h3>📅 Milestones</h3>
            <ul>
              <li><strong style={{color:"var(--secondary)"}}>1998</strong> — Founded with 3 engineering departments and 240 students.</li>
              <li><strong style={{color:"var(--secondary)"}}>2003</strong> — Achieved autonomous status from Anna University.</li>
              <li><strong style={{color:"var(--secondary)"}}>2008</strong> — Launched first M.E. postgraduate programs.</li>
              <li><strong style={{color:"var(--secondary)"}}>2014</strong> — Established the Innovation and Startup Incubation Center.</li>
              <li><strong style={{color:"var(--secondary)"}}>2019</strong> — ISO 9001:2015 Certification achieved.</li>
              <li><strong style={{color:"var(--secondary)"}}>2024</strong> — Ranked among Top 50 Engineering Colleges in Tamil Nadu.</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>📊 At a Glance</h3>
            <ul>
              <li>25+ Years of Academic Excellence</li>
              <li>12,000+ Alumni Across the Globe</li>
              <li>500+ Qualified Faculty Members</li>
              <li>10 Engineering Departments</li>
              <li>100+ Industry MoU Partners</li>
              <li>95% Average Placement Rate</li>
              <li>50+ Research Publications per Year</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Campus Facilities</h2>
        <p className="section-subtitle">A modern campus built to inspire learning, innovation, and collaboration.</p>
        <div className="grid-3">
          <div className="content-card">
            <h3>🏫 Academic Infrastructure</h3>
            <ul>
              <li>Smart Classrooms with Digital Boards</li>
              <li>Advanced Engineering Laboratories</li>
              <li>High-Speed Wi-Fi Campus Network</li>
              <li>Digital Library with E-Journal Access</li>
              <li>Dedicated Research &amp; Project Rooms</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>🧪 Technical Labs</h3>
            <ul>
              <li>IoT &amp; Embedded Systems Lab</li>
              <li>Robotics and Automation Lab</li>
              <li>Machine Learning &amp; AI Lab</li>
              <li>Advanced VLSI Design Lab</li>
              <li>CAD/CAM and Manufacturing Lab</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>🏟️ Student Amenities</h3>
            <ul>
              <li>Sports Complex &amp; Gymnasium</li>
              <li>Separate Boys &amp; Girls Hostels</li>
              <li>On-Campus Canteen &amp; Cafeteria</li>
              <li>Medical Centre with Full-Time Doctor</li>
              <li>Counselling &amp; Grievance Cell</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2 className="section-title">Leadership</h2>
        <p className="section-subtitle">Guided by visionary leaders committed to academic excellence.</p>
        <div className="grid-3">
          {[
            { name: "Dr. R. Subramaniam", role: "Chairman & Founder", desc: "PhD in Computer Science, IIT Madras. 35+ years in academia and research." },
            { name: "Dr. S. Lakshmi Priya", role: "Principal", desc: "PhD in Electronics, NIT Trichy. Recipient of Best Principal Award – Tamil Nadu 2022." },
            { name: "Prof. A. Venkatesh", role: "Dean – Academics", desc: "M.Tech from IIT Bombay. 28 years of teaching and curriculum development experience." },
          ].map((leader) => (
            <div className="content-card" key={leader.name} style={{ textAlign: "center" }}>
              <div style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: "linear-gradient(135deg,var(--secondary-light),var(--secondary))",
                display: "grid", placeItems: "center", fontSize: "2rem",
                margin: "0 auto 16px"
              }}>👤</div>
              <h3 style={{ textAlign: "center" }}>{leader.name}</h3>
              <p style={{ color: "var(--secondary)", fontSize: "0.88rem", marginBottom: "10px", fontWeight: "600" }}>{leader.role}</p>
              <p style={{ fontSize: "0.92rem" }}>{leader.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
