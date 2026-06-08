import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminAPI, studentAPI, teacherAPI, noticeAPI } from "../utils/api";
import { toast } from "react-toastify";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import logo from "../assets/logo.png";
import "../assets/css/AdminDashboard.css";

const CHART_COLORS = ["#0A2342", "#D4AF37", "#2ed573", "#3498db", "#e74c3c"];
const DEPARTMENTS = ["Computer Science","Electronics","Mechanical","Civil","Electrical","Information Technology"];

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const set = (v) => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [val, set];
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats]         = useState(null);
  const [students, setStudents]   = useState([]);
  const [teachers, setTeachers]   = useState([]);
  const [pending, setPending]     = useState([]);
  const [notices, setNotices]     = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");

  // Inline edit state
  const [editStudent, setEditStudent] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  const [saving, setSaving]           = useState(false);

  // Add forms
  const blankStudent = { name:"", email:"", password:"", phone:"", registerNumber:"", department:"Computer Science", semester:"1" };
  const blankTeacher = { name:"", email:"", password:"", phone:"", employeeId:"", department:"Computer Science", subject:"", qualification:"", experience:"0" };
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [addStudentForm, setAddStudentForm] = useState(blankStudent);
  const [addTeacherForm, setAddTeacherForm] = useState(blankTeacher);
  const [addingSt, setAddingSt] = useState(false);
  const [addingTe, setAddingTe] = useState(false);

  // Notice form
  const [noticeForm, setNoticeForm]   = useState({ title: "", description: "", priority: "normal", department: "All" });
  const [savingNotice, setSavingNotice] = useState(false);
  const [editNotice, setEditNotice]   = useState(null);

  // Persistent fee & placement
  const [fees, setFees]               = useLocalStorage("gec_fees", []);
  const [feeForm, setFeeForm]         = useState({ studentName: "", amount: "", semester: "1", status: "pending", description: "" });

  const [placements, setPlacements]   = useLocalStorage("gec_placements", []);
  const [placementForm, setPlacementForm] = useState({ studentName: "", company: "", role: "", package: "", year: new Date().getFullYear(), status: "placed" });

  // ── Fetch all data ────────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    try {
      const [s, st, te, p, n] = await Promise.all([
        adminAPI.getDashboardStats(),
        studentAPI.getAllStudents(),
        teacherAPI.getAllTeachers(),
        adminAPI.getPendingApprovals(),
        noticeAPI.getAllNotices(),
      ]);
      setStats(s.data); setStudents(st.data); setTeachers(te.data);
      setPending(p.data); setNotices(n.data);
    } catch { toast.error("Failed to load dashboard data"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Approvals ────────────────────────────────────────────────────────
  const handleApprove = async (id) => {
    try { await adminAPI.approveUser(id); toast.success("User approved!"); fetchAll(); }
    catch { toast.error("Approval failed"); }
  };
  const handleReject = async (id) => {
    try { await adminAPI.rejectUser(id, { reason: "Rejected by admin" }); toast.success("User rejected!"); fetchAll(); }
    catch { toast.error("Reject failed"); }
  };

  // ── Student inline edit ───────────────────────────────────────────────
  const saveStudent = async () => {
    if (!editStudent) return;
    setSaving(true);
    try {
      await Promise.all([
        studentAPI.updateStudent(editStudent._id, {
          department: editStudent.department,
          semester: Number(editStudent.semester),
        }),
        adminAPI.updateUser(editStudent.userId, { name: editStudent.name }),
      ]);
      toast.success("Student updated!");
      setEditStudent(null);
      fetchAll();
    } catch (e) { toast.error(e.response?.data?.error || "Update failed"); }
    finally { setSaving(false); }
  };

  // ── Teacher inline edit ───────────────────────────────────────────────
  const saveTeacher = async () => {
    if (!editTeacher) return;
    setSaving(true);
    try {
      await Promise.all([
        teacherAPI.updateTeacher(editTeacher._id, {
          department: editTeacher.department,
          subject: editTeacher.subject,
          qualification: editTeacher.qualification,
          experience: Number(editTeacher.experience),
        }),
        adminAPI.updateUser(editTeacher.userId, { name: editTeacher.name }),
      ]);
      toast.success("Teacher updated!");
      setEditTeacher(null);
      fetchAll();
    } catch (e) { toast.error(e.response?.data?.error || "Update failed"); }
    finally { setSaving(false); }
  };

  // ── Add Student ──────────────────────────────────────────────────────
  const handleAddStudent = async (e) => {
    e.preventDefault();
    const { name, email, password, registerNumber, department, semester } = addStudentForm;
    if (!name || !email || !password || !registerNumber || !department || !semester) {
      toast.error("All starred fields are required"); return;
    }
    setAddingSt(true);
    try {
      await studentAPI.createStudent({ ...addStudentForm, semester: parseInt(addStudentForm.semester) });
      toast.success(`Student "${name}" added!`);
      setAddStudentForm(blankStudent);
      setShowAddStudent(false);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || "Failed to add student"); }
    finally { setAddingSt(false); }
  };

  const handleDeleteStudent = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"? This cannot be undone.`)) return;
    try { await studentAPI.deleteStudent(id); toast.success(`"${name}" deleted`); fetchAll(); }
    catch (err) { toast.error(err.response?.data?.error || "Delete failed"); }
  };

  // ── Add Teacher ──────────────────────────────────────────────────────
  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const { name, email, password, employeeId, department, subject } = addTeacherForm;
    if (!name || !email || !password || !employeeId || !department || !subject) {
      toast.error("All starred fields are required"); return;
    }
    setAddingTe(true);
    try {
      await teacherAPI.createTeacher({ ...addTeacherForm, experience: parseInt(addTeacherForm.experience) || 0 });
      toast.success(`Teacher "${name}" added!`);
      setAddTeacherForm(blankTeacher);
      setShowAddTeacher(false);
      fetchAll();
    } catch (err) { toast.error(err.response?.data?.error || "Failed to add teacher"); }
    finally { setAddingTe(false); }
  };

  const handleDeleteTeacher = async (id, name) => {
    if (!window.confirm(`Delete teacher "${name}"? This cannot be undone.`)) return;
    try { await teacherAPI.deleteTeacher(id); toast.success(`"${name}" deleted`); fetchAll(); }
    catch (err) { toast.error(err.response?.data?.error || "Delete failed"); }
  };

  // ── Notices ───────────────────────────────────────────────────────────
  const handleSaveNotice = async (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.description) { toast.error("Title & description required"); return; }
    setSavingNotice(true);
    try {
      if (editNotice) {
        await noticeAPI.updateNotice(editNotice, { ...noticeForm });
        toast.success("Notice updated!");
        setEditNotice(null);
      } else {
        await noticeAPI.createNotice({ ...noticeForm });
        toast.success("Notice published!");
      }
      setNoticeForm({ title: "", description: "", priority: "normal", department: "All" });
      const r = await noticeAPI.getAllNotices(); setNotices(r.data);
    } catch (e) { toast.error(e.response?.data?.error || "Failed"); }
    finally { setSavingNotice(false); }
  };

  const startEditNotice = (n) => {
    setEditNotice(n._id);
    setNoticeForm({ title: n.title, description: n.description, priority: n.priority, department: n.department });
  };

  const cancelNoticeEdit = () => {
    setEditNotice(null);
    setNoticeForm({ title: "", description: "", priority: "normal", department: "All" });
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try { await noticeAPI.deleteNotice(id); toast.success("Deleted"); const r = await noticeAPI.getAllNotices(); setNotices(r.data); }
    catch { toast.error("Delete failed"); }
  };

  // ── Fees ──────────────────────────────────────────────────────────────
  const addFee = (e) => {
    e.preventDefault();
    if (!feeForm.studentName || !feeForm.amount) { toast.error("Name and amount required"); return; }
    setFees([...fees, { ...feeForm, id: Date.now(), createdAt: new Date().toISOString() }]);
    setFeeForm({ studentName: "", amount: "", semester: "1", status: "pending", description: "" });
    toast.success("Fee record added!");
  };
  const setFeeStatus = (id, status) => { setFees(fees.map(f => f.id === id ? { ...f, status } : f)); };
  const deleteFee = (id) => { if (window.confirm("Delete fee record?")) setFees(fees.filter(f => f.id !== id)); };

  // ── Placements ────────────────────────────────────────────────────────
  const addPlacement = (e) => {
    e.preventDefault();
    if (!placementForm.studentName || !placementForm.company) { toast.error("Name and company required"); return; }
    setPlacements([...placements, { ...placementForm, id: Date.now(), createdAt: new Date().toISOString() }]);
    setPlacementForm({ studentName: "", company: "", role: "", package: "", year: new Date().getFullYear(), status: "placed" });
    toast.success("Placement added!");
  };
  const deletePlacement = (id) => { if (window.confirm("Delete placement record?")) setPlacements(placements.filter(p => p.id !== id)); };

  if (loading) return (
    <div className="dashboard-loading">
      <div className="spinner" /><p>Loading Admin Dashboard...</p>
    </div>
  );

  const q = search.toLowerCase();
  const filtStudents = students.filter(s =>
    s.userId?.name?.toLowerCase().includes(q) || s.registerNumber?.toLowerCase().includes(q)
  );
  const filtTeachers = teachers.filter(t =>
    t.userId?.name?.toLowerCase().includes(q) || t.employeeId?.toLowerCase().includes(q)
  );

  return (
    <div className="admin-dashboard">
      {/* ── Sidebar ── */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="logo" className="sidebar-logo" />
          <h3>Admin Panel</h3>
          <p className="sidebar-user">{user?.name}</p>
        </div>
        <nav className="sidebar-menu">
          {[
            { id: "dashboard",  icon: "📊", label: "Dashboard" },
            { id: "students",   icon: "👥", label: `Students (${students.length})` },
            { id: "teachers",   icon: "👨‍🏫", label: `Teachers (${teachers.length})` },
            { id: "approvals",  icon: "✅", label: `Approvals (${pending.length})` },
            { id: "fees",       icon: "💰", label: `Fees (${fees.length})` },
            { id: "placements", icon: "🏢", label: `Placements (${placements.length})` },
            { id: "notices",    icon: "📢", label: "Notices" },
          ].map(item => (
            <button key={item.id} type="button"
              className={`menu-item${activeTab === item.id ? " active" : ""}`}
              onClick={() => { setActiveTab(item.id); setSearch(""); setEditStudent(null); setEditTeacher(null); }}
            >
              <span className="menu-icon">{item.icon}</span> {item.label}
              {item.id === "approvals" && pending.length > 0 && (
                <span className="menu-badge">{pending.length}</span>
              )}
            </button>
          ))}
          <button type="button" className="menu-item logout" onClick={() => { logout(); navigate("/login"); }}>
            <span className="menu-icon">🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* ── Content ── */}
      <main className="dashboard-content">

        {/* ─── DASHBOARD ─── */}
        {activeTab === "dashboard" && (
          <div className="dashboard-section">
            <div className="section-heading">
              <h1>Welcome back, {user?.name}! 👋</h1>
              <span className="section-date">{new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</span>
            </div>

            <div className="stats-grid">
              {[
                { label: "Total Students",    value: stats?.totalStudents    || 0, icon: "🎓", color: "#3b82f6" },
                { label: "Total Teachers",    value: stats?.totalTeachers    || 0, icon: "👨‍🏫", color: "#10b981" },
                { label: "Pending Approvals", value: stats?.pendingApprovals || 0, icon: "⏳", color: "#f59e0b" },
                { label: "Attendance Rate",   value: `${stats?.attendanceRate || 0}%`, icon: "📋", color: "#8b5cf6" },
                { label: "Fee Records",       value: fees.length,                    icon: "💰", color: "#D4AF37" },
                { label: "Placed Students",   value: placements.filter(p => p.status === "placed").length, icon: "🏢", color: "#0A2342" },
              ].map(c => (
                <div key={c.label} className="stat-card" style={{ "--accent": c.color }}>
                  <div className="stat-icon">{c.icon}</div>
                  <div className="stat-number">{c.value}</div>
                  <div className="stat-label">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>Students by Department</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats?.studentsByDepartment || []} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="_id" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#D4AF37" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-card">
                <h3>Users by Role</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={stats?.usersByRole || []} dataKey="count" nameKey="_id"
                      cx="50%" cy="50%" outerRadius={95} label={({ _id, count }) => `${_id}: ${count}`}>
                      {(stats?.usersByRole || []).map((e, i) => <Cell key={e._id} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {pending.length > 0 && (
              <div className="dashboard-alert">
                <h2>⚠️ {pending.length} Pending Approval{pending.length > 1 ? "s" : ""}</h2>
                <div className="approvals-grid">
                  {pending.map(a => (
                    <div key={a.user._id} className="approval-card">
                      <div className="approval-header">
                        <h3>{a.user.name}</h3>
                        <span className="badge badge-warning">{a.user.role}</span>
                      </div>
                      <p>📧 {a.user.email}</p>
                      {a.additionalData?.registerNumber && <p>📋 Reg: {a.additionalData.registerNumber}</p>}
                      {a.additionalData?.employeeId     && <p>🪪 Emp: {a.additionalData.employeeId}</p>}
                      <div className="approval-actions">
                        <button className="btn btn-sm btn-success" onClick={() => handleApprove(a.user._id)}>✅ Approve</button>
                        <button className="btn btn-sm btn-danger"  onClick={() => handleReject(a.user._id)}>❌ Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2>📢 Recent Notices</h2>
              <div className="notices-grid">
                {notices.slice(0, 3).map(n => (
                  <div key={n._id} className="notice-card">
                    <div className="notice-header">
                      <h3>{n.title}</h3>
                      <span className={`badge badge-${n.priority === "high" ? "danger" : "warning"}`}>{n.priority}</span>
                    </div>
                    <p>{n.description}</p>
                    <small>{new Date(n.createdAt).toLocaleDateString()}</small>
                  </div>
                ))}
                {notices.length === 0 && <p className="empty-state">No notices yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ─── STUDENTS ─── */}
        {activeTab === "students" && (
          <div className="dashboard-section">
            <div className="section-heading">
              <h1>Student Management</h1>
              <button className="btn btn-primary" onClick={() => { setShowAddStudent(v => !v); setEditStudent(null); }}>
                {showAddStudent ? "✕ Cancel" : "➕ Add Student"}
              </button>
            </div>

            {showAddStudent && (
              <div className="admin-form" style={{ marginBottom: 24 }}>
                <h3>➕ Add New Student</h3>
                <form onSubmit={handleAddStudent}>
                  <div className="form-row">
                    <div className="form-group"><label>Full Name *</label>
                      <input placeholder="Student name" value={addStudentForm.name} onChange={e => setAddStudentForm(f => ({ ...f, name: e.target.value }))} /></div>
                    <div className="form-group"><label>Email *</label>
                      <input type="email" placeholder="student@email.com" value={addStudentForm.email} onChange={e => setAddStudentForm(f => ({ ...f, email: e.target.value }))} /></div>
                    <div className="form-group"><label>Password *</label>
                      <input type="password" placeholder="Min 6 chars" value={addStudentForm.password} onChange={e => setAddStudentForm(f => ({ ...f, password: e.target.value }))} /></div>
                    <div className="form-group"><label>Phone</label>
                      <input placeholder="10-digit number" value={addStudentForm.phone} onChange={e => setAddStudentForm(f => ({ ...f, phone: e.target.value }))} /></div>
                    <div className="form-group"><label>Register Number *</label>
                      <input placeholder="e.g. GEC2025001" value={addStudentForm.registerNumber} onChange={e => setAddStudentForm(f => ({ ...f, registerNumber: e.target.value }))} /></div>
                    <div className="form-group"><label>Department *</label>
                      <select value={addStudentForm.department} onChange={e => setAddStudentForm(f => ({ ...f, department: e.target.value }))}>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select></div>
                    <div className="form-group"><label>Semester *</label>
                      <select value={addStudentForm.semester} onChange={e => setAddStudentForm(f => ({ ...f, semester: e.target.value }))}>
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                      </select></div>
                  </div>
                  <div className="ie-actions">
                    <button type="submit" className="btn btn-primary" disabled={addingSt}>{addingSt ? "Adding…" : "💾 Add Student"}</button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddStudent(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="search-bar">
              <input placeholder="🔍 Search by name or register number…" value={search}
                onChange={e => setSearch(e.target.value)} className="form-control" />
            </div>

            {editStudent && (
              <div className="inline-edit-panel">
                <h3>✏️ Editing: {editStudent.name}</h3>
                <div className="ie-fields">
                  <div className="form-group"><label>Full Name</label>
                    <input value={editStudent.name} onChange={e => setEditStudent(s => ({ ...s, name: e.target.value }))} /></div>
                  <div className="form-group"><label>Department</label>
                    <select value={editStudent.department} onChange={e => setEditStudent(s => ({ ...s, department: e.target.value }))}>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                    </select></div>
                  <div className="form-group"><label>Semester</label>
                    <select value={editStudent.semester} onChange={e => setEditStudent(s => ({ ...s, semester: e.target.value }))}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Semester {n}</option>)}
                    </select></div>
                </div>
                <div className="ie-actions">
                  <button className="btn btn-primary" onClick={saveStudent} disabled={saving}>{saving ? "Saving…" : "💾 Save Changes"}</button>
                  <button className="btn btn-outline" onClick={() => setEditStudent(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>#</th><th>Name</th><th>Register No.</th><th>Email</th><th>Department</th><th>Semester</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtStudents.map((s, i) => (
                    <tr key={s._id} className={editStudent?._id === s._id ? "row-editing" : ""}>
                      <td>{i + 1}</td>
                      <td><strong>{s.userId?.name}</strong></td>
                      <td><code>{s.registerNumber}</code></td>
                      <td>{s.userId?.email}</td>
                      <td><span className="badge badge-primary">{s.department}</span></td>
                      <td>Sem {s.semester}</td>
                      <td className="action-cell">
                        <button className="btn btn-sm btn-edit"
                          onClick={() => { setShowAddStudent(false); setEditStudent({ _id: s._id, userId: s.userId?._id, name: s.userId?.name, department: s.department, semester: s.semester }); }}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-sm btn-ghost"
                          onClick={() => handleDeleteStudent(s._id, s.userId?.name)}>
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtStudents.length === 0 && <tr><td colSpan="7" className="empty-state">No students found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── TEACHERS ─── */}
        {activeTab === "teachers" && (
          <div className="dashboard-section">
            <div className="section-heading">
              <h1>Teacher Management</h1>
              <button className="btn btn-primary" onClick={() => { setShowAddTeacher(v => !v); setEditTeacher(null); }}>
                {showAddTeacher ? "✕ Cancel" : "➕ Add Teacher"}
              </button>
            </div>

            {showAddTeacher && (
              <div className="admin-form" style={{ marginBottom: 24 }}>
                <h3>➕ Add New Teacher</h3>
                <form onSubmit={handleAddTeacher}>
                  <div className="form-row">
                    <div className="form-group"><label>Full Name *</label>
                      <input placeholder="Teacher name" value={addTeacherForm.name} onChange={e => setAddTeacherForm(f => ({ ...f, name: e.target.value }))} /></div>
                    <div className="form-group"><label>Email *</label>
                      <input type="email" placeholder="teacher@email.com" value={addTeacherForm.email} onChange={e => setAddTeacherForm(f => ({ ...f, email: e.target.value }))} /></div>
                    <div className="form-group"><label>Password *</label>
                      <input type="password" placeholder="Min 6 chars" value={addTeacherForm.password} onChange={e => setAddTeacherForm(f => ({ ...f, password: e.target.value }))} /></div>
                    <div className="form-group"><label>Phone</label>
                      <input placeholder="10-digit number" value={addTeacherForm.phone} onChange={e => setAddTeacherForm(f => ({ ...f, phone: e.target.value }))} /></div>
                    <div className="form-group"><label>Employee ID *</label>
                      <input placeholder="e.g. GEC004" value={addTeacherForm.employeeId} onChange={e => setAddTeacherForm(f => ({ ...f, employeeId: e.target.value }))} /></div>
                    <div className="form-group"><label>Department *</label>
                      <select value={addTeacherForm.department} onChange={e => setAddTeacherForm(f => ({ ...f, department: e.target.value }))}>
                        {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select></div>
                    <div className="form-group"><label>Subject *</label>
                      <input placeholder="e.g. Data Structures" value={addTeacherForm.subject} onChange={e => setAddTeacherForm(f => ({ ...f, subject: e.target.value }))} /></div>
                    <div className="form-group"><label>Qualification</label>
                      <input placeholder="e.g. M.Tech, Ph.D." value={addTeacherForm.qualification} onChange={e => setAddTeacherForm(f => ({ ...f, qualification: e.target.value }))} /></div>
                    <div className="form-group"><label>Experience (years)</label>
                      <input type="number" min="0" value={addTeacherForm.experience} onChange={e => setAddTeacherForm(f => ({ ...f, experience: e.target.value }))} /></div>
                  </div>
                  <div className="ie-actions">
                    <button type="submit" className="btn btn-primary" disabled={addingTe}>{addingTe ? "Adding…" : "💾 Add Teacher"}</button>
                    <button type="button" className="btn btn-outline" onClick={() => setShowAddTeacher(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="search-bar">
              <input placeholder="🔍 Search by name or employee ID…" value={search}
                onChange={e => setSearch(e.target.value)} className="form-control" />
            </div>

            {editTeacher && (
              <div className="inline-edit-panel">
                <h3>✏️ Editing: {editTeacher.name}</h3>
                <div className="ie-fields">
                  <div className="form-group"><label>Full Name</label>
                    <input value={editTeacher.name} onChange={e => setEditTeacher(t => ({ ...t, name: e.target.value }))} /></div>
                  <div className="form-group"><label>Department</label>
                    <select value={editTeacher.department} onChange={e => setEditTeacher(t => ({ ...t, department: e.target.value }))}>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                    </select></div>
                  <div className="form-group"><label>Subject</label>
                    <input value={editTeacher.subject} onChange={e => setEditTeacher(t => ({ ...t, subject: e.target.value }))} /></div>
                  <div className="form-group"><label>Qualification</label>
                    <input value={editTeacher.qualification} onChange={e => setEditTeacher(t => ({ ...t, qualification: e.target.value }))} /></div>
                  <div className="form-group"><label>Experience (years)</label>
                    <input type="number" min="0" value={editTeacher.experience} onChange={e => setEditTeacher(t => ({ ...t, experience: e.target.value }))} /></div>
                </div>
                <div className="ie-actions">
                  <button className="btn btn-primary" onClick={saveTeacher} disabled={saving}>{saving ? "Saving…" : "💾 Save Changes"}</button>
                  <button className="btn btn-outline" onClick={() => setEditTeacher(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>#</th><th>Name</th><th>Emp ID</th><th>Email</th><th>Department</th><th>Subject</th><th>Exp</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtTeachers.map((t, i) => (
                    <tr key={t._id} className={editTeacher?._id === t._id ? "row-editing" : ""}>
                      <td>{i + 1}</td>
                      <td><strong>{t.userId?.name}</strong></td>
                      <td><code>{t.employeeId}</code></td>
                      <td>{t.userId?.email}</td>
                      <td><span className="badge badge-secondary">{t.department}</span></td>
                      <td>{t.subject}</td>
                      <td>{t.experience}yr</td>
                      <td className="action-cell">
                        <button className="btn btn-sm btn-edit"
                          onClick={() => { setShowAddTeacher(false); setEditTeacher({ _id: t._id, userId: t.userId?._id, name: t.userId?.name, department: t.department, subject: t.subject, qualification: t.qualification || "", experience: t.experience || 0 }); }}>
                          ✏️ Edit
                        </button>
                        <button className="btn btn-sm btn-ghost"
                          onClick={() => handleDeleteTeacher(t._id, t.userId?.name)}>
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtTeachers.length === 0 && <tr><td colSpan="8" className="empty-state">No teachers found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── APPROVALS ─── */}
        {activeTab === "approvals" && (
          <div className="dashboard-section">
            <div className="section-heading"><h1>Pending Approvals</h1></div>
            {pending.length === 0 ? <p className="empty-state">✅ No pending approvals.</p> : (
              <div className="approvals-grid">
                {pending.map(a => (
                  <div key={a.user._id} className="approval-card">
                    <div className="approval-header">
                      <h3>{a.user.name}</h3>
                      <span className="badge badge-warning">{a.user.role}</span>
                    </div>
                    <p>📧 {a.user.email}</p>
                    {a.additionalData?.registerNumber && <p>📋 Reg No: {a.additionalData.registerNumber}</p>}
                    {a.additionalData?.employeeId     && <p>🪪 Emp ID: {a.additionalData.employeeId}</p>}
                    {a.additionalData?.department     && <p>🏫 Dept: {a.additionalData.department}</p>}
                    <div className="approval-actions">
                      <button className="btn btn-sm btn-success" onClick={() => handleApprove(a.user._id)}>✅ Approve</button>
                      <button className="btn btn-sm btn-danger"  onClick={() => handleReject(a.user._id)}>❌ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── FEES ─── */}
        {activeTab === "fees" && (
          <div className="dashboard-section">
            <div className="section-heading"><h1>Fee Management</h1></div>
            <div className="admin-form">
              <h3>💰 Add Fee Record</h3>
              <form onSubmit={addFee}>
                <div className="form-row">
                  <div className="form-group"><label>Student Name *</label>
                    <input placeholder="Student name" value={feeForm.studentName} onChange={e => setFeeForm(f => ({ ...f, studentName: e.target.value }))} /></div>
                  <div className="form-group"><label>Amount (₹) *</label>
                    <input type="number" placeholder="50000" value={feeForm.amount} onChange={e => setFeeForm(f => ({ ...f, amount: e.target.value }))} /></div>
                  <div className="form-group"><label>Semester</label>
                    <select value={feeForm.semester} onChange={e => setFeeForm(f => ({ ...f, semester: e.target.value }))}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>Sem {n}</option>)}</select></div>
                  <div className="form-group"><label>Status</label>
                    <select value={feeForm.status} onChange={e => setFeeForm(f => ({ ...f, status: e.target.value }))}>
                      <option value="pending">Pending</option><option value="paid">Paid</option><option value="overdue">Overdue</option></select></div>
                </div>
                <div className="form-group"><label>Description</label>
                  <input placeholder="Tuition fee / Exam fee…" value={feeForm.description} onChange={e => setFeeForm(f => ({ ...f, description: e.target.value }))} /></div>
                <button type="submit" className="btn btn-primary">💾 Add Record</button>
              </form>
            </div>
            <div className="section-subheading">All Fee Records ({fees.length})</div>
            {fees.length === 0 ? <p className="empty-state">No fee records yet.</p> : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead><tr><th>#</th><th>Student</th><th>Amount</th><th>Sem</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {fees.map((f, i) => (
                      <tr key={f.id}>
                        <td>{i + 1}</td>
                        <td><strong>{f.studentName}</strong></td>
                        <td>₹{Number(f.amount).toLocaleString("en-IN")}</td>
                        <td>Sem {f.semester}</td>
                        <td>{f.description || "—"}</td>
                        <td><span className={`badge badge-${f.status === "paid" ? "success" : f.status === "overdue" ? "danger" : "warning"}`}>{f.status}</span></td>
                        <td className="action-cell">
                          {f.status !== "paid"    && <button className="btn btn-sm btn-success" onClick={() => setFeeStatus(f.id, "paid")}>Paid</button>}
                          {f.status !== "overdue" && <button className="btn btn-sm btn-danger"  onClick={() => setFeeStatus(f.id, "overdue")}>Overdue</button>}
                          <button className="btn btn-sm btn-ghost" onClick={() => deleteFee(f.id)}>🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── PLACEMENTS ─── */}
        {activeTab === "placements" && (
          <div className="dashboard-section">
            <div className="section-heading"><h1>Placement Management</h1></div>

            <div className="stats-grid" style={{ marginBottom: 28 }}>
              {[
                { label: "Total",      value: placements.length,                                         color: "#0A2342" },
                { label: "Placed",     value: placements.filter(p => p.status === "placed").length,      color: "#10b981" },
                { label: "In Process", value: placements.filter(p => p.status === "in-process").length,  color: "#f59e0b" },
                { label: "Not Placed", value: placements.filter(p => p.status === "not-placed").length,  color: "#ef4444" },
              ].map(c => (
                <div key={c.label} className="stat-card" style={{ "--accent": c.color }}>
                  <div className="stat-number">{c.value}</div>
                  <div className="stat-label">{c.label}</div>
                </div>
              ))}
            </div>

            <div className="admin-form">
              <h3>🏢 Add Placement Record</h3>
              <form onSubmit={addPlacement}>
                <div className="form-row">
                  <div className="form-group"><label>Student Name *</label>
                    <input placeholder="Student name" value={placementForm.studentName} onChange={e => setPlacementForm(f => ({ ...f, studentName: e.target.value }))} /></div>
                  <div className="form-group"><label>Company *</label>
                    <input placeholder="e.g. TCS, Infosys…" value={placementForm.company} onChange={e => setPlacementForm(f => ({ ...f, company: e.target.value }))} /></div>
                  <div className="form-group"><label>Role</label>
                    <input placeholder="Software Engineer" value={placementForm.role} onChange={e => setPlacementForm(f => ({ ...f, role: e.target.value }))} /></div>
                  <div className="form-group"><label>Package (LPA)</label>
                    <input placeholder="e.g. 8 LPA" value={placementForm.package} onChange={e => setPlacementForm(f => ({ ...f, package: e.target.value }))} /></div>
                  <div className="form-group"><label>Year</label>
                    <input type="number" value={placementForm.year} onChange={e => setPlacementForm(f => ({ ...f, year: e.target.value }))} /></div>
                  <div className="form-group"><label>Status</label>
                    <select value={placementForm.status} onChange={e => setPlacementForm(f => ({ ...f, status: e.target.value }))}>
                      <option value="placed">Placed</option><option value="in-process">In Process</option><option value="not-placed">Not Placed</option></select></div>
                </div>
                <button type="submit" className="btn btn-primary">💾 Add Record</button>
              </form>
            </div>

            {placements.length === 0 ? <p className="empty-state">No placement records yet.</p> : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead><tr><th>#</th><th>Student</th><th>Company</th><th>Role</th><th>Package</th><th>Year</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {placements.map((p, i) => (
                      <tr key={p.id}>
                        <td>{i + 1}</td>
                        <td><strong>{p.studentName}</strong></td>
                        <td>{p.company}</td>
                        <td>{p.role || "—"}</td>
                        <td>{p.package || "—"}</td>
                        <td>{p.year}</td>
                        <td><span className={`badge badge-${p.status === "placed" ? "success" : p.status === "in-process" ? "warning" : "danger"}`}>{p.status}</span></td>
                        <td><button className="btn btn-sm btn-ghost" onClick={() => deletePlacement(p.id)}>🗑</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── NOTICES ─── */}
        {activeTab === "notices" && (
          <div className="dashboard-section">
            <div className="section-heading"><h1>Notice Board</h1></div>
            <div className="admin-form">
              <h3>{editNotice ? "✏️ Edit Notice" : "📝 Publish New Notice"}</h3>
              <form onSubmit={handleSaveNotice}>
                <div className="form-row">
                  <div className="form-group"><label>Title *</label>
                    <input placeholder="Notice title…" value={noticeForm.title} onChange={e => setNoticeForm(f => ({ ...f, title: e.target.value }))} /></div>
                  <div className="form-group"><label>Priority</label>
                    <select value={noticeForm.priority} onChange={e => setNoticeForm(f => ({ ...f, priority: e.target.value }))}>
                      <option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option></select></div>
                  <div className="form-group"><label>Department</label>
                    <select value={noticeForm.department} onChange={e => setNoticeForm(f => ({ ...f, department: e.target.value }))}>
                      <option value="All">All Departments</option>
                      {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select></div>
                </div>
                <div className="form-group"><label>Description *</label>
                  <textarea rows="3" placeholder="Short description…" value={noticeForm.description} onChange={e => setNoticeForm(f => ({ ...f, description: e.target.value }))} /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="submit" className="btn btn-primary" disabled={savingNotice}>
                    {savingNotice ? "Saving…" : editNotice ? "💾 Update Notice" : "📢 Publish Notice"}
                  </button>
                  {editNotice && <button type="button" className="btn btn-outline" onClick={cancelNoticeEdit}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className="section-subheading">All Notices ({notices.length})</div>
            <div className="notices-grid">
              {notices.length === 0 ? <p className="empty-state">No notices yet.</p> : notices.map(n => (
                <div key={n._id} className="notice-card">
                  <div className="notice-header">
                    <h3>{n.title}</h3>
                    <span className={`badge badge-${n.priority === "high" ? "danger" : n.priority === "normal" ? "primary" : "warning"}`}>{n.priority}</span>
                  </div>
                  <p>{n.description}</p>
                  <div className="notice-footer">
                    <small>{new Date(n.createdAt).toLocaleDateString()}</small>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-sm btn-edit" onClick={() => startEditNotice(n)}>✏️ Edit</button>
                      <button className="btn btn-sm btn-ghost" onClick={() => deleteNotice(n._id)}>🗑</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
