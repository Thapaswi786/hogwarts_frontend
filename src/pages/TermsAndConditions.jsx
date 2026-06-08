import React from "react";
import PageTitle from "../components/PageTitle";

function TermsAndConditions() {
  return (
    <main className="page">
      <PageTitle title="Terms & Conditions" />

      <h1 className="section-title">Terms &amp; Conditions</h1>
      <p className="section-subtitle">
        Last updated: January 1, 2026. Please read these terms carefully before using
        the Hogwarts University College Management Portal.
      </p>

      <div className="content-card policy-content" style={{ maxWidth: "860px", margin: "0 auto" }}>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using the Hogwarts University College Management Portal ("Portal"),
          website, or any related services, you agree to be bound by these Terms and Conditions
          and our Privacy Policy. If you do not agree to these terms, you must not use our
          services. These terms apply to all users including students, faculty, staff, and
          administrative personnel.
        </p>

        <h3>2. User Accounts and Access</h3>
        <ul>
          <li>Each user is assigned a unique login credential. Sharing of login credentials is strictly prohibited.</li>
          <li>You are responsible for maintaining the confidentiality of your username and password.</li>
          <li>You must immediately report any unauthorized use of your account to the IT Department.</li>
          <li>The institution reserves the right to suspend or terminate accounts found in violation of these terms.</li>
          <li>Access is granted based on your role (Student, Teacher, or Admin) and is limited to functions relevant to that role.</li>
        </ul>

        <h3>3. Acceptable Use Policy</h3>
        <p>Users of the Portal agree to:</p>
        <ul>
          <li>Use the portal only for legitimate academic and administrative purposes.</li>
          <li>Not attempt to access accounts, systems, or data that you are not authorized to access.</li>
          <li>Not upload, share, or transmit harmful, offensive, or illegal content through the portal.</li>
          <li>Not attempt to reverse engineer, hack, or disrupt the functioning of the portal.</li>
          <li>Comply with all applicable laws including the Information Technology Act, 2000 (India).</li>
          <li>Not use portal data for commercial purposes or share institutional data with unauthorized parties.</li>
        </ul>

        <h3>4. Academic Integrity</h3>
        <p>
          All students are expected to uphold the highest standards of academic integrity.
          The following are strictly prohibited and may result in disciplinary action including
          expulsion:
        </p>
        <ul>
          <li>Plagiarism in assignments, projects, or research papers.</li>
          <li>Cheating or use of unauthorized materials during examinations.</li>
          <li>Submitting work that is not your own without proper attribution.</li>
          <li>Manipulating or attempting to alter academic records within the portal.</li>
        </ul>

        <h3>5. Fee Payment and Refund Policy</h3>
        <ul>
          <li>All fees must be paid within the deadlines specified in the academic calendar.</li>
          <li>Late fee payments may attract a penalty as notified by the Finance Office.</li>
          <li>Fee receipts generated through the portal are official documents and must be preserved.</li>
          <li>Refunds, where applicable, will be processed as per the institution's refund policy and applicable government regulations.</li>
          <li>Fee structures are subject to revision by the institution and will be communicated with adequate notice.</li>
        </ul>

        <h3>6. Attendance and Academic Requirements</h3>
        <ul>
          <li>Students must maintain a minimum attendance of 75% in all subjects to be eligible to appear for examinations.</li>
          <li>Attendance records displayed on the portal are official and maintained by faculty.</li>
          <li>Medical condonation for attendance shortage must be applied for through the proper channel within the specified period.</li>
          <li>Students are responsible for monitoring their attendance and academic performance through the portal.</li>
        </ul>

        <h3>7. Examination and Results</h3>
        <ul>
          <li>Examination schedules, hall ticket downloads, and results are published through the portal.</li>
          <li>Students must verify their personal details on hall tickets and report discrepancies immediately.</li>
          <li>Results are provisional until officially declared by Anna University.</li>
          <li>Revaluation or re-totalling requests must be submitted within the specified deadline with applicable fees.</li>
        </ul>

        <h3>8. Code of Conduct</h3>
        <p>All users are expected to maintain professional conduct while using the portal. This includes:</p>
        <ul>
          <li>Treating all members of the university community with respect and dignity.</li>
          <li>Not engaging in harassment, bullying, or discriminatory behaviour through portal communications.</li>
          <li>Using official communication channels for academic and administrative matters.</li>
          <li>Adhering to the dress code and discipline norms when on campus.</li>
        </ul>

        <h3>9. Intellectual Property</h3>
        <p>
          All content available on the portal including course materials, study notes, lecture
          recordings, and institutional documents is the intellectual property of Hogwarts
          University or respective faculty members. Unauthorized reproduction, distribution,
          or commercial use of any portal content is prohibited and may result in legal action.
        </p>

        <h3>10. Limitation of Liability</h3>
        <p>
          Hogwarts University shall not be liable for any direct, indirect, incidental, or
          consequential damages arising from the use of or inability to use the portal,
          including but not limited to data loss, service interruptions, or system errors.
          The institution makes reasonable efforts to maintain portal availability but does
          not guarantee uninterrupted access.
        </p>

        <h3>11. Modifications to Terms</h3>
        <p>
          Hogwarts University reserves the right to modify these Terms and Conditions at any
          time. Updated terms will be published on this page with a revised effective date.
          Continued use of the portal after any modification constitutes your acceptance of
          the revised terms. Users are encouraged to review these terms periodically.
        </p>

        <h3>12. Governing Law</h3>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the
          laws of India. Any disputes arising in connection with these terms shall be subject
          to the exclusive jurisdiction of the courts of Madurai, Tamil Nadu, India.
        </p>

        <h3>13. Contact for Terms Queries</h3>
        <ul>
          <li><strong>Legal &amp; Compliance Office:</strong> Hogwarts University</li>
          <li><strong>Email:</strong> legal@hogwartsuniversity.edu.in</li>
          <li><strong>Phone:</strong> +91 98765 43210</li>
          <li><strong>Address:</strong> Hogwarts University, Anna Nagar, Madurai – 625 020, Tamil Nadu, India.</li>
        </ul>
      </div>
    </main>
  );
}

export default TermsAndConditions;
