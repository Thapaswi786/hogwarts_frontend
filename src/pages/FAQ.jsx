import React, { useState } from "react";
import PageTitle from "../components/PageTitle";

const faqData = [
  {
    category: "Admissions",
    items: [
      {
        q: "What are the eligibility criteria for B.E. / B.Tech programs?",
        a: "Candidates must have completed 10+2 (or equivalent) with Physics, Chemistry, and Mathematics as core subjects from a recognized board. A minimum aggregate of 50% (45% for reserved categories) is required. Valid TNEA rank or management quota eligibility is also needed.",
      },
      {
        q: "When does the admission process begin?",
        a: "Admission for undergraduate programs begins in June–July following the release of Tamil Nadu Engineering Admissions (TNEA) counseling schedule. Postgraduate admissions generally open in July–August. Exact dates are published on our website and the TNEA portal.",
      },
      {
        q: "What documents are required for admission?",
        a: "You will need: 10th and 12th mark sheets, Transfer Certificate, Community Certificate, Nativity Certificate, Aadhar card, passport-size photographs, and TNEA allotment order. PG applicants additionally need their UG degree certificate and consolidated mark sheet.",
      },
      {
        q: "Is there a management quota for admissions?",
        a: "Yes. A limited number of seats are available under the management quota for eligible candidates. Interested students should contact our Admissions Office directly for details, availability, and the application process.",
      },
      {
        q: "Can I apply for lateral entry admission?",
        a: "Yes. Diploma holders with a minimum 50% aggregate are eligible to apply for lateral entry into the second year of B.E./B.Tech programs. Admission is through the TANCET (Tamil Nadu Common Entrance Test) conducted by Anna University.",
      },
    ],
  },
  {
    category: "Academics",
    items: [
      {
        q: "Which university are the programs affiliated to?",
        a: "All undergraduate and postgraduate engineering programs at Hogwarts University are affiliated to Anna University, Chennai, and follow the curriculum, examination pattern, and grading system prescribed by Anna University.",
      },
      {
        q: "What is the minimum attendance required?",
        a: "Students must maintain a minimum of 75% attendance in each subject to be eligible to sit for end-semester examinations. Students with between 65%–74% attendance may apply for condonation with valid medical or other documentary proof.",
      },
      {
        q: "How are examinations conducted?",
        a: "Internal assessments are conducted by the college throughout the semester (two cycle tests, an assignment, and a model exam). End-semester examinations are conducted by Anna University as per their announced schedule.",
      },
      {
        q: "Does the college offer internship opportunities?",
        a: "Yes. Industry internships are mandatory as part of the curriculum in most programs. The Placement and Training Cell actively coordinates with 100+ industry partners to provide internship opportunities for third and final year students.",
      },
    ],
  },
  {
    category: "Fees & Finance",
    items: [
      {
        q: "What is the fee structure for engineering programs?",
        a: "The fee structure is regulated by the Tamil Nadu Engineering Admissions committee. Fees vary by program and category (Government/Management quota). The detailed, current fee structure is available from the Admissions Office or the official TNEA portal.",
      },
      {
        q: "Are scholarships available?",
        a: "Yes. Students can avail scholarships from the Tamil Nadu government (BC, MBC, SC/ST scholarships), the central government (National Scholarship Portal), and institutional merit scholarships. Our Finance Office assists students with scholarship applications.",
      },
      {
        q: "What are the payment methods accepted for fees?",
        a: "Fees can be paid online through the College Management Portal via net banking, UPI (GPay, PhonePe, Paytm), credit/debit cards, or DD in favour of 'Hogwarts University'. Cash payments are accepted at the Finance Office counter during working hours.",
      },
    ],
  },
  {
    category: "Portal & Technical",
    items: [
      {
        q: "I forgot my portal password. How do I reset it?",
        a: "Visit the Login page and click 'Forgot Password'. Enter your registered email address to receive a one-time OTP. Verify the OTP and set your new password. If you do not receive the OTP, contact the IT Department at it@hogwartsuniversity.edu.in.",
      },
      {
        q: "Can I access the portal from my mobile phone?",
        a: "Yes. The College Management Portal is fully responsive and works on all modern smartphones and tablets through any web browser. We recommend using Chrome or Safari for the best experience.",
      },
      {
        q: "My marks or attendance on the portal seem incorrect. What should I do?",
        a: "If you notice discrepancies in your attendance or internal marks, first contact the concerned subject faculty member. If the issue is not resolved, submit a written request to the Examination Cell or your Department Head with supporting documents.",
      },
      {
        q: "Who should I contact for technical issues with the portal?",
        a: "For login issues, data errors, or portal functionality problems, contact our IT Support team at it@hogwartsuniversity.edu.in or call +91 98765 43210 during office hours (Monday–Friday, 9:00 AM–5:00 PM).",
      },
    ],
  },
  {
    category: "Campus & Hostel",
    items: [
      {
        q: "Is hostel accommodation available?",
        a: "Yes. We have separate hostel facilities for boys and girls with 24/7 security, Wi-Fi, mess facility, and common rooms. Hostel seats are limited and allotted on a first-come, first-served basis. Apply through the Hostel Office at the time of admission.",
      },
      {
        q: "Is the campus Wi-Fi enabled?",
        a: "Yes. The entire campus including classrooms, laboratories, library, and hostel is covered with high-speed Wi-Fi. Students can connect up to two personal devices using their portal credentials.",
      },
      {
        q: "Are there sports and extracurricular activities?",
        a: "Absolutely. We have a sports complex with facilities for cricket, football, basketball, volleyball, badminton, and a gymnasium. Students can also join technical clubs (Coding Club, Robotics Club), cultural associations, NSS, and NCC.",
      },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span style={{ fontSize: "1.2rem", transition: "transform 0.25s", transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
      </button>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
}

function FAQ() {
  return (
    <main className="page">
      <PageTitle title="FAQ" />

      <h1 className="section-title">Frequently Asked Questions</h1>
      <p className="section-subtitle">
        Find answers to the most common questions about admissions, academics, fees,
        the portal, and campus life at Hogwarts University.
      </p>

      {faqData.map((section) => (
        <section className="section-block" key={section.category} style={{ marginBottom: "42px" }}>
          <h2 style={{ color: "var(--secondary)", fontSize: "1.35rem", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid var(--border)" }}>
            {section.category}
          </h2>
          {section.items.map((item) => (
            <FAQItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </section>
      ))}

      <div className="content-card" style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto" }}>
        <h3>Still have questions?</h3>
        <p style={{ margin: "12px 0 20px" }}>
          Our team is happy to help. Reach out to us and we'll get back to you within 24 hours.
        </p>
        <a href="/contact" className="btn-gold" style={{
          padding: "12px 28px", borderRadius: "14px",
          textDecoration: "none", fontWeight: "700", display: "inline-block"
        }}>
          Contact Us
        </a>
      </div>
    </main>
  );
}

export default FAQ;
