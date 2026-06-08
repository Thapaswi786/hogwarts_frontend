import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

function NotFound() {
  return (
    <main className="page notfound-wrap">
      <PageTitle title="Page Not Found" />
      <div>
        <h1>404</h1>
        <h2 style={{ color: "var(--white)", margin: "12px 0 16px", fontSize: "1.8rem" }}>Page Not Found</h2>
        <p style={{ color: "var(--muted)", maxWidth: "440px", margin: "0 auto 28px", lineHeight: "1.75" }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-gold" style={{
          padding: "13px 28px", borderRadius: "14px",
          textDecoration: "none", fontWeight: "700", display: "inline-block"
        }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
