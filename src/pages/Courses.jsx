import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

const ugCourses = [
  {
    tag: "UG — 4 Years",
    title: "B.E. Computer Science and Engineering",
    desc: "Covers algorithms, data structures, operating systems, databases, software engineering, AI, and full-stack development.",
    seats: "120 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "UG — 4 Years",
    title: "B.E. Electronics and Communication Engineering",
    desc: "Covers signal processing, VLSI design, embedded systems, communication networks, and wireless technologies.",
    seats: "60 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "UG — 4 Years",
    title: "B.E. Electrical and Electronics Engineering",
    desc: "Covers power systems, control systems, electric drives, renewable energy, and smart grid technologies.",
    seats: "60 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "UG — 4 Years",
    title: "B.E. Mechanical Engineering",
    desc: "Covers thermodynamics, fluid mechanics, manufacturing processes, CAD/CAM, robotics, and industrial engineering.",
    seats: "60 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "UG — 4 Years",
    title: "B.Tech Information Technology",
    desc: "Covers cloud computing, cybersecurity, data analytics, web technologies, IoT, and enterprise software systems.",
    seats: "60 Seats",
    affiliation: "Anna University",
  },
];

const pgCourses = [
  {
    tag: "PG — 2 Years",
    title: "M.E. Computer Science and Engineering",
    desc: "Advanced topics in machine learning, distributed systems, compiler design, and high-performance computing.",
    seats: "18 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "PG — 2 Years",
    title: "M.E. VLSI Design",
    desc: "Specialization in chip design, FPGA programming, advanced digital circuits, and nanotechnology-based electronics.",
    seats: "18 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "PG — 2 Years",
    title: "M.Tech Artificial Intelligence and Data Science",
    desc: "Deep learning, NLP, computer vision, big data analytics, and intelligent systems design.",
    seats: "18 Seats",
    affiliation: "Anna University",
  },
  {
    tag: "PG — 2 Years",
    title: "M.E. Power Systems Engineering",
    desc: "Power electronics, smart grids, renewable energy integration, and high-voltage engineering.",
    seats: "18 Seats",
    affiliation: "Anna University",
  },
];

function CourseCard({ tag, title, desc, seats, affiliation }) {
  return (
    <div className="course-card">
      <span className="course-tag">{tag}</span>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="course-meta">
        <span>🎓 {seats}</span>
        <span>🏫 {affiliation}</span>
      </div>
    </div>
  );
}

function Courses() {
  return (
    <main className="page">
      <PageTitle title="Courses" />

      <h1 className="section-title">Engineering Programs</h1>
      <p className="section-subtitle">
        World-class undergraduate and postgraduate engineering programs accredited by Anna
        University, designed to produce industry-ready graduates.
      </p>

      {/* Undergraduate */}
      <section className="section-block">
        <h2 style={{ color: "var(--secondary)", marginBottom: "22px", fontSize: "1.6rem" }}>
          Undergraduate Programs (B.E. / B.Tech)
        </h2>
        <div className="grid-3">
          {ugCourses.map((c) => <CourseCard key={c.title} {...c} />)}
        </div>
      </section>

      {/* Postgraduate */}
      <section className="section-block">
        <h2 style={{ color: "var(--secondary)", marginBottom: "22px", fontSize: "1.6rem" }}>
          Postgraduate Programs (M.E. / M.Tech)
        </h2>
        <div className="grid-3">
          {pgCourses.map((c) => <CourseCard key={c.title} {...c} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="section-block" style={{ textAlign: "center" }}>
        <div className="content-card" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h3>Ready to Join?</h3>
          <p style={{ marginBottom: "20px" }}>
            Apply for admission today and take the first step towards a successful engineering
            career at Hogwarts University.
          </p>
          <Link to="/admission" className="btn-gold" style={{
            padding: "13px 28px", borderRadius: "14px",
            textDecoration: "none", fontWeight: "700", display: "inline-block"
          }}>
            Apply for Admission
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Courses;
