import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

function Home() {
  return (
    <main className="page">
      <PageTitle title="Home" />

      {/* Hero */}
      <section className="hero">
        <div>
          <h2>Welcome to <span>Hogwarts University</span></h2>
          <p>
            Hogwarts University is a premier engineering institution committed to technical
            excellence, innovation, research, and career-focused education. We prepare students
            for real-world industry challenges through practical learning, expert faculty guidance,
            and modern state-of-the-art labs.
          </p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn-gold">Explore Engineering Courses</Link>
            <Link to="/admission" className="btn-glass">Admission Process</Link>
          </div>
        </div>
        <div className="hero-card">
          <h3>Engineering Education with Innovation</h3>
          <p>
            Discover an advanced academic environment with engineering departments, research
            support, digital learning systems, technical events, and placement-focused
            development programs.
          </p>
          <ul style={{ paddingLeft: "20px", marginTop: "14px", color: "var(--muted)" }}>
            <li>5 Undergraduate Engineering Programs</li>
            <li>5 Postgraduate Specializations</li>
            <li>100+ Industry Partnerships</li>
            <li>95% Placement Record</li>
          </ul>
        </div>
      </section>

      {/* About */}
      <section className="section-block">
        <h2 className="section-title">About Us</h2>
        <p className="section-subtitle">
          Hogwarts University offers a future-ready engineering ecosystem built around
          innovation, practical exposure, academic excellence, and professional growth.
        </p>
        <div className="grid-3">
          <div className="content-card">
            <h3>Our Vision</h3>
            <p>
              To become a center of excellence in engineering and technology education that
              nurtures skilled, ethical, and globally competent professionals ready for the
              challenges of tomorrow.
            </p>
          </div>
          <div className="content-card">
            <h3>Our Mission</h3>
            <p>
              To provide high-quality technical education, hands-on laboratory practice,
              project-based learning, innovation culture, and strong industry collaboration
              that shapes future engineers.
            </p>
          </div>
          <div className="content-card">
            <h3>Campus Facilities</h3>
            <p>
              Smart classrooms, engineering labs, innovation centers, digital library,
              placement cell, workshops, coding clubs, and student technical forums
              support every learner's journey.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-block">
        <h2 className="section-title">Our Programs</h2>
        <p className="section-subtitle">
          Explore core engineering programs designed to build technical knowledge, design
          thinking, and industry-ready practical skills.
        </p>
        <div className="grid-3">
          <div className="content-card">
            <h3>Undergraduate Engineering</h3>
            <ul>
              <li>B.E. Computer Science and Engineering</li>
              <li>B.E. Electronics and Communication Engineering</li>
              <li>B.E. Electrical and Electronics Engineering</li>
              <li>B.E. Mechanical Engineering</li>
              <li>B.Tech Information Technology</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>Postgraduate Engineering</h3>
            <ul>
              <li>M.E. Computer Science and Engineering</li>
              <li>M.E. VLSI Design</li>
              <li>M.E. Power Systems Engineering</li>
              <li>M.E. Structural Engineering</li>
              <li>M.Tech Artificial Intelligence &amp; Data Science</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>Technical Enrichment</h3>
            <ul>
              <li>Embedded Systems Lab Training</li>
              <li>Full Stack Development Program</li>
              <li>Cloud Computing and DevOps Workshop</li>
              <li>Robotics and Automation Club</li>
              <li>Industry Certification Preparation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="section-block">
        <h2 className="section-title">Admissions</h2>
        <p className="section-subtitle">
          Join our engineering programs through a guided, transparent, and student-friendly
          admission process.
        </p>
        <div className="grid-2">
          <div className="content-card">
            <h3>Admission Procedure</h3>
            <ul>
              <li>Submit the online application for the selected engineering program.</li>
              <li>Upload mark sheets, ID proof, and required supporting documents.</li>
              <li>Application review based on academic eligibility and course requirements.</li>
              <li>Seat confirmation through counseling or merit-based selection.</li>
              <li>Fee payment and enrollment confirmation.</li>
            </ul>
          </div>
          <div className="content-card">
            <h3>Eligibility Requirements</h3>
            <ul>
              <li>10th and 12th with Mathematics, Physics, Chemistry for UG engineering.</li>
              <li>Relevant undergraduate degree for PG engineering admission.</li>
              <li>Transfer certificate and community certificate where applicable.</li>
              <li>Passport size photo and government-issued ID proof.</li>
              <li>Valid mobile number and email for admission communication.</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "32px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/admission" className="btn-gold" style={{ padding: "14px 32px", borderRadius: "14px", textDecoration: "none", fontWeight: "700" }}>
            Apply Now
          </Link>
          <Link to="/register" className="btn-glass" style={{ padding: "14px 32px", borderRadius: "14px", textDecoration: "none", fontWeight: "700" }}>
            Student / Teacher Registration
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
