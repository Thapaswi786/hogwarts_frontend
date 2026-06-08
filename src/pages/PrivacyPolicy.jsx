import React from "react";
import PageTitle from "../components/PageTitle";

function PrivacyPolicy() {
  return (
    <main className="page">
      <PageTitle title="Privacy Policy" />

      <h1 className="section-title">Privacy Policy</h1>
      <p className="section-subtitle">
        Last updated: January 1, 2026. This policy explains how Hogwarts University
        collects, uses, and protects your personal information.
      </p>

      <div className="content-card policy-content" style={{ maxWidth: "860px", margin: "0 auto" }}>

        <h3>1. Introduction</h3>
        <p>
          Hogwarts University ("we", "our", or "the institution") is committed to protecting
          the privacy of all students, faculty, staff, and website visitors. This Privacy Policy
          outlines the types of personal information we collect, how it is used, stored, shared,
          and protected in compliance with applicable data protection regulations.
        </p>

        <h3>2. Information We Collect</h3>
        <p>We may collect the following categories of personal information:</p>
        <ul>
          <li><strong>Identity Data:</strong> Full name, date of birth, gender, student/employee ID.</li>
          <li><strong>Contact Data:</strong> Email address, phone number, postal address, emergency contact details.</li>
          <li><strong>Academic Data:</strong> Marks, attendance, course enrollment, examination results, academic history.</li>
          <li><strong>Financial Data:</strong> Fee payment records, scholarship details, bank account information (for refunds).</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, login timestamps, portal usage logs.</li>
          <li><strong>Sensitive Data:</strong> Health records (where required for medical accommodations), community/caste certificate for reservation.</li>
        </ul>

        <h3>3. How We Use Your Information</h3>
        <p>Your personal data is used for the following purposes:</p>
        <ul>
          <li>Processing and managing admission applications and enrollments.</li>
          <li>Maintaining student and staff academic and administrative records.</li>
          <li>Sending important notifications about examinations, results, fees, and events.</li>
          <li>Providing access to the College Management Portal and digital learning resources.</li>
          <li>Processing scholarship applications, fee payments, and financial assistance.</li>
          <li>Complying with legal, regulatory, and accreditation requirements.</li>
          <li>Improving our website, portal services, and institutional systems.</li>
        </ul>

        <h3>4. Data Sharing and Disclosure</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may
          share your information only in the following circumstances:
        </p>
        <ul>
          <li>With affiliated universities (Anna University) for examination and certification purposes.</li>
          <li>With government bodies (AICTE, NAAC, UGC) for accreditation and compliance reporting.</li>
          <li>With payment gateways for secure fee transactions (data is encrypted and not retained).</li>
          <li>With authorized placement companies during campus recruitment, only with student consent.</li>
          <li>When required by law, court order, or government authority.</li>
        </ul>

        <h3>5. Data Security</h3>
        <p>
          We implement appropriate technical and organizational security measures to protect
          your personal data against unauthorized access, alteration, disclosure, or destruction.
          These measures include:
        </p>
        <ul>
          <li>SSL/TLS encryption for all data transmitted through our portal.</li>
          <li>Role-based access controls restricting data to authorized personnel only.</li>
          <li>Regular security audits and vulnerability assessments of our systems.</li>
          <li>Secure, encrypted storage of sensitive personal and financial data.</li>
          <li>Mandatory password policies and two-factor authentication for staff accounts.</li>
        </ul>

        <h3>6. Cookies and Tracking</h3>
        <p>
          Our website uses cookies to enhance user experience and portal functionality.
          Cookies help us remember your preferences and keep you logged in securely. You may
          disable cookies through your browser settings; however, some portal features may
          not function correctly without them. We do not use third-party advertising cookies.
        </p>

        <h3>7. Data Retention</h3>
        <p>
          We retain personal data for as long as necessary to fulfil the purposes outlined in
          this policy or as required by law. Student academic records are retained permanently
          for transcript and certificate issuance. Financial records are retained for 7 years
          in accordance with accounting regulations. Portal login logs are retained for 2 years.
        </p>

        <h3>8. Your Rights</h3>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
          <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data.</li>
          <li><strong>Right to Deletion:</strong> Request deletion of your data (subject to legal retention obligations).</li>
          <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</li>
          <li><strong>Right to Portability:</strong> Request transfer of your data in a machine-readable format.</li>
        </ul>
        <p>To exercise any of these rights, contact our Data Protection Officer at <strong style={{ color: "var(--secondary)" }}>privacy@hogwartsuniversity.edu.in</strong>.</p>

        <h3>9. Third-Party Links</h3>
        <p>
          Our website may contain links to external websites such as government portals,
          Anna University, or partner organizations. We are not responsible for the privacy
          practices of these third-party websites and encourage you to review their individual
          privacy policies before providing any personal information.
        </p>

        <h3>10. Children's Privacy</h3>
        <p>
          Our portal is not intended for children under the age of 16 without parental consent.
          For minor students admitted with parental supervision, the parent or guardian is
          responsible for reviewing this Privacy Policy on the student's behalf.
        </p>

        <h3>11. Changes to This Policy</h3>
        <p>
          We reserve the right to update this Privacy Policy at any time. Changes will be posted
          on this page with the updated effective date. We encourage users to periodically review
          this policy. Continued use of our portal following any changes constitutes acceptance
          of the revised policy.
        </p>

        <h3>12. Contact Us</h3>
        <p>
          For privacy-related concerns, data requests, or complaints, please contact:
        </p>
        <ul>
          <li><strong>Data Protection Officer:</strong> Dr. Minerva McGonagall</li>
          <li><strong>Email:</strong> privacy@hogwartsuniversity.edu.in</li>
          <li><strong>Phone:</strong> +91 98765 43210</li>
          <li><strong>Address:</strong> Hogwarts University, Anna Nagar, Madurai – 625 020, Tamil Nadu, India.</li>
        </ul>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
