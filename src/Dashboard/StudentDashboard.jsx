import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { studentAPI, attendanceAPI, marksAPI, noticeAPI } from "../utils/api";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import "../assets/css/StudentDashboardcss.css";

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [marks, setMarks] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, attendanceRes, marksRes, noticesRes] = await Promise.all([
          studentAPI.getMyProfile(),
          attendanceAPI.getMyAttendance(),
          marksAPI.getMyMarks(),
          noticeAPI.getAllNotices(),
        ]);

        setProfile(profileRes.data);
        setAttendance(attendanceRes.data);
        setMarks(marksRes.data);
        setNotices(noticesRes.data);
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Student Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h3>Student Portal</h3>
          <p>{user?.name}</p>
        </div>
        <nav className="sidebar-menu">
          {[
            { id: "profile", label: "👤 Profile" },
            { id: "attendance", label: "📋 Attendance" },
            { id: "marks", label: "📊 Marks" },
            { id: "notices", label: "📢 Notices" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`menu-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="menu-item logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="dashboard-content">
        {activeTab === "profile" && profile && (
          <div className="dashboard-section">
            <h1>Welcome, {user?.name}! 👋</h1>
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-placeholder">{user?.name?.charAt(0)}</div>
                <div className="profile-info">
                  <h2>{user?.name}</h2>
                  <p className="email">{user?.email}</p>
                  <p className="register-number">Reg. No: {profile?.registerNumber}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item"><span className="label">Department</span><span className="value">{profile?.department}</span></div>
                <div className="detail-item"><span className="label">Semester</span><span className="value">{profile?.semester}</span></div>
                <div className="detail-item"><span className="label">Phone</span><span className="value">{user?.phone || "N/A"}</span></div>
                <div className="detail-item"><span className="label">Status</span><span className="badge badge-success">{user?.status}</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="dashboard-section">
            <h2>Attendance</h2>
            {attendance?.percentage && Object.keys(attendance.percentage).length > 0 ? (
              <>
                <div className="attendance-summary">
                  {Object.entries(attendance.percentage).map(([subject, percentage]) => (
                    <div key={subject} className="summary-card">
                      <h4>{subject}</h4>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <p>{percentage}%</p>
                    </div>
                  ))}
                </div>
                <table className="data-table">
                  <thead>
                    <tr><th>Subject</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {(attendance.records || []).map((record) => (
                      <tr key={record._id}>
                        <td>{record.subject}</td>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td><span className={`badge badge-${record.status === "present" ? "success" : "danger"}`}>{record.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p className="empty-state">No attendance records yet.</p>
            )}
          </div>
        )}

        {activeTab === "marks" && (
          <div className="dashboard-section">
            <h2>Marks</h2>
            {marks?.bySemester && Object.keys(marks.bySemester).length > 0 ? (
              Object.entries(marks.bySemester).map(([semester, semesterMarks]) => (
                <div key={semester} className="semester-section">
                  <h3>Semester {semester}</h3>
                  <table className="data-table">
                    <thead>
                      <tr><th>Subject</th><th>Internals</th><th>Externals</th><th>Total</th><th>Grade</th></tr>
                    </thead>
                    <tbody>
                      {semesterMarks.map((mark) => (
                        <tr key={mark._id}>
                          <td>{mark.subject}</td>
                          <td>{mark.internals}</td>
                          <td>{mark.externals}</td>
                          <td>{mark.total}</td>
                          <td><span className="badge badge-primary">{mark.grade}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="empty-state">No marks published yet.</p>
            )}
          </div>
        )}

        {activeTab === "notices" && (
          <div className="dashboard-section">
            <h2>Notices</h2>
            <div className="notices-grid">
              {notices.length === 0 ? (
                <p className="empty-state">No notices at the moment.</p>
              ) : (
                notices.map((notice) => (
                  <div key={notice._id} className="notice-card">
                    <h3>{notice.title}</h3>
                    <p>{notice.description}</p>
                    <small>{new Date(notice.createdAt || notice.noticeDate).toLocaleDateString()}</small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
