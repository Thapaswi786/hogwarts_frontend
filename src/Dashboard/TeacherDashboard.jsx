import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { teacherAPI, studentAPI, noticeAPI, attendanceAPI, marksAPI } from "../utils/api";
import { toast } from "react-toastify";
import logo from "../assets/logo.png";
import "../assets/css/TeacherDashboardcss.css";

function TeacherDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);

  // Attendance state
  const [attDate, setAttDate] = useState(new Date().toISOString().split("T")[0]);
  const [attSubject, setAttSubject] = useState("");
  const [attStatuses, setAttStatuses] = useState({});
  const [savingAtt, setSavingAtt] = useState(false);

  // Marks state
  const [marksSubject, setMarksSubject] = useState("");
  const [marksSemester, setMarksSemester] = useState("1");
  const [studentMarks, setStudentMarks] = useState({});
  const [savingMarks, setSavingMarks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, studentsRes, noticesRes] = await Promise.all([
          teacherAPI.getMyProfile(),
          studentAPI.getAllStudents(),
          noticeAPI.getAllNotices(),
        ]);
        setProfile(profileRes.data);
        setStudents(studentsRes.data);
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

  // Initialize attendance statuses when students load
  useEffect(() => {
    const init = {};
    students.forEach((s) => { init[s._id] = "present"; });
    setAttStatuses(init);
    const initMarks = {};
    students.forEach((s) => { initMarks[s._id] = { internals: "", externals: "" }; });
    setStudentMarks(initMarks);
  }, [students]);

  const handleLogout = () => { logout(); navigate("/login"); };

  const handleSaveAttendance = async () => {
    if (!attSubject.trim()) { toast.error("Please enter a subject"); return; }
    setSavingAtt(true);
    try {
      const records = students.map((s) => ({
        studentId: s._id,
        date: attDate,
        status: attStatuses[s._id] || "present",
        subject: attSubject,
      }));
      await attendanceAPI.bulkMarkAttendance(records);
      toast.success("Attendance saved successfully!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to save attendance");
    } finally {
      setSavingAtt(false);
    }
  };

  const handleSaveMarks = async () => {
    if (!marksSubject.trim()) { toast.error("Please enter a subject"); return; }
    setSavingMarks(true);
    let saved = 0, failed = 0;
    for (const s of students) {
      const m = studentMarks[s._id];
      if (!m || m.internals === "" || m.externals === "") continue;
      try {
        await marksAPI.addMarks({
          studentId: s._id,
          subject: marksSubject,
          semester: parseInt(marksSemester),
          internals: Number(m.internals),
          externals: Number(m.externals),
        });
        saved++;
      } catch { failed++; }
    }
    setSavingMarks(false);
    if (saved > 0) toast.success(`Marks saved for ${saved} student(s)!`);
    if (failed > 0) toast.error(`Failed for ${failed} student(s)`);
  };

  if (loading) {
    return (
      <div className="td-loading">
        <div className="td-spinner"></div>
        <p>Loading Teacher Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="td-wrap">
      {/* ── Sidebar ── */}
      <aside className="td-sidebar">
        <div className="td-sidebar-header">
          <img src={logo} alt="Logo" className="td-logo" />
          <h3>Teacher Portal</h3>
          <p>{user?.name}</p>
        </div>
        <nav className="td-sidebar-nav">
          {[
            { id: "profile",    label: "👤 Profile" },
            { id: "students",   label: "👥 Students" },
            { id: "attendance", label: "📋 Attendance" },
            { id: "marks",      label: "📊 Enter Marks" },
            { id: "notices",    label: "📢 Notices" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`td-nav-btn${activeTab === item.id ? " active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button type="button" className="td-nav-btn td-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="td-main">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div className="td-section">
            <h1 className="td-page-title">Welcome, {user?.name}! 👋</h1>
            <div className="td-profile-card">
              <div className="td-avatar">{user?.name?.charAt(0)}</div>
              <div className="td-profile-info">
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
                <span className="td-badge td-badge-gold">Emp. ID: {profile?.employeeId}</span>
              </div>
            </div>
            <div className="td-details-grid">
              {[
                { label: "Department", value: profile?.department },
                { label: "Subject", value: profile?.subject },
                { label: "Qualification", value: profile?.qualification || "N/A" },
                { label: "Experience", value: `${profile?.experience || 0} years` },
                { label: "Phone", value: user?.phone || "N/A" },
                { label: "Status", value: user?.status, badge: true },
              ].map((d) => (
                <div key={d.label} className="td-detail-item">
                  <span className="td-detail-label">{d.label}</span>
                  {d.badge
                    ? <span className="td-badge td-badge-success">{d.value}</span>
                    : <span className="td-detail-value">{d.value}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {activeTab === "students" && (
          <div className="td-section">
            <h1 className="td-page-title">Students</h1>
            <div className="td-table-wrap">
              <table className="td-table">
                <thead>
                  <tr>
                    <th>#</th><th>Name</th><th>Reg. No</th><th>Email</th><th>Dept</th><th>Sem</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="6" className="td-empty">No students found.</td></tr>
                  ) : students.map((s, i) => (
                    <tr key={s._id}>
                      <td>{i + 1}</td>
                      <td><strong>{s.userId?.name}</strong></td>
                      <td>{s.registerNumber}</td>
                      <td>{s.userId?.email}</td>
                      <td><span className="td-badge td-badge-primary">{s.department}</span></td>
                      <td>Sem {s.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="td-section">
            <h1 className="td-page-title">Mark Attendance</h1>
            <div className="td-form-row">
              <div className="td-form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={attDate}
                  onChange={(e) => setAttDate(e.target.value)}
                  className="td-input"
                />
              </div>
              <div className="td-form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics"
                  value={attSubject}
                  onChange={(e) => setAttSubject(e.target.value)}
                  className="td-input"
                />
              </div>
            </div>
            <div className="td-table-wrap">
              <table className="td-table">
                <thead>
                  <tr><th>#</th><th>Student Name</th><th>Reg. No</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="td-empty">No students to mark.</td></tr>
                  ) : students.map((s, i) => (
                    <tr key={s._id}>
                      <td>{i + 1}</td>
                      <td><strong>{s.userId?.name}</strong></td>
                      <td>{s.registerNumber}</td>
                      <td>
                        <select
                          value={attStatuses[s._id] || "present"}
                          onChange={(e) => setAttStatuses((prev) => ({ ...prev, [s._id]: e.target.value }))}
                          className={`td-status-select td-status-${attStatuses[s._id] || "present"}`}
                        >
                          <option value="present">✅ Present</option>
                          <option value="absent">❌ Absent</option>
                          <option value="leave">🏖 Leave</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="td-save-btn"
              onClick={handleSaveAttendance}
              disabled={savingAtt}
            >
              {savingAtt ? "Saving..." : "💾 Save Attendance"}
            </button>
          </div>
        )}

        {/* MARKS */}
        {activeTab === "marks" && (
          <div className="td-section">
            <h1 className="td-page-title">Enter Marks</h1>
            <div className="td-form-row">
              <div className="td-form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Physics"
                  value={marksSubject}
                  onChange={(e) => setMarksSubject(e.target.value)}
                  className="td-input"
                />
              </div>
              <div className="td-form-group">
                <label>Semester</label>
                <select
                  value={marksSemester}
                  onChange={(e) => setMarksSemester(e.target.value)}
                  className="td-input"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>Semester {n}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="td-help-text">Internals: max 40 &nbsp;|&nbsp; Externals: max 60</p>
            <div className="td-table-wrap">
              <table className="td-table">
                <thead>
                  <tr><th>#</th><th>Name</th><th>Reg. No</th><th>Internals (/40)</th><th>Externals (/60)</th></tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="5" className="td-empty">No students found.</td></tr>
                  ) : students.map((s, i) => (
                    <tr key={s._id}>
                      <td>{i + 1}</td>
                      <td><strong>{s.userId?.name}</strong></td>
                      <td>{s.registerNumber}</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="40"
                          className="td-marks-input"
                          placeholder="0-40"
                          value={studentMarks[s._id]?.internals ?? ""}
                          onChange={(e) =>
                            setStudentMarks((prev) => ({
                              ...prev,
                              [s._id]: { ...prev[s._id], internals: e.target.value },
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          max="60"
                          className="td-marks-input"
                          placeholder="0-60"
                          value={studentMarks[s._id]?.externals ?? ""}
                          onChange={(e) =>
                            setStudentMarks((prev) => ({
                              ...prev,
                              [s._id]: { ...prev[s._id], externals: e.target.value },
                            }))
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="td-save-btn"
              onClick={handleSaveMarks}
              disabled={savingMarks}
            >
              {savingMarks ? "Saving..." : "💾 Save Marks"}
            </button>
          </div>
        )}

        {/* NOTICES */}
        {activeTab === "notices" && (
          <div className="td-section">
            <h1 className="td-page-title">Notices</h1>
            {notices.length === 0 ? (
              <p className="td-empty-state">No notices at the moment.</p>
            ) : (
              <div className="td-notices-grid">
                {notices.map((n) => (
                  <div key={n._id} className="td-notice-card">
                    <div className="td-notice-header">
                      <h3>{n.title}</h3>
                      <span className={`td-badge ${n.priority === "high" ? "td-badge-danger" : "td-badge-warning"}`}>
                        {n.priority}
                      </span>
                    </div>
                    <p>{n.description}</p>
                    <small>{new Date(n.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

export default TeacherDashboard;
