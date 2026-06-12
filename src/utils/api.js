import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (name, email, password, confirmPassword) =>
    api.post('/auth/register', { name, email, password, confirmPassword }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () =>
    api.get('/auth/me'),
  logout: () =>
    api.post('/auth/logout'),
  changePassword: (oldPassword, newPassword, confirmPassword) =>
    api.put('/auth/change-password', { oldPassword, newPassword, confirmPassword })
};

// Student API
export const studentAPI = {
  getAllStudents: (params) =>
    api.get('/students', { params }),
  getStudentById: (id) =>
    api.get(`/students/${id}`),
  createStudent: (data) =>
    api.post('/students', data),
  updateStudent: (id, data) =>
    api.put(`/students/${id}`, data),
  deleteStudent: (id) =>
    api.delete(`/students/${id}`),
  getMyProfile: () =>
    api.get('/students/profile/me'),
  updateMyProfile: (data) =>
    api.put('/students/profile/me', data)
};

// Teacher API
export const teacherAPI = {
  getAllTeachers: (params) =>
    api.get('/teachers', { params }),
  getTeacherById: (id) =>
    api.get(`/teachers/${id}`),
  createTeacher: (data) =>
    api.post('/teachers', data),
  updateTeacher: (id, data) =>
    api.put(`/teachers/${id}`, data),
  deleteTeacher: (id) =>
    api.delete(`/teachers/${id}`),
  getMyProfile: () =>
    api.get('/teachers/profile/me'),
  updateMyProfile: (data) =>
    api.put('/teachers/profile/me', data)
};

// Admin API
export const adminAPI = {
  getPendingApprovals: () =>
    api.get('/admin/pending-approvals'),
  approveUser: (userId) =>
    api.put(`/admin/approve/${userId}`),
  rejectUser: (userId, data) =>
    api.put(`/admin/reject/${userId}`, data),
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),
  getAllUsers: (params) =>
    api.get('/admin/users', { params }),
  updateUser: (userId, data) =>
    api.put(`/admin/users/${userId}`, data),
  deleteUser: (userId) =>
    api.delete(`/admin/users/${userId}`)
};

// Notice API
export const noticeAPI = {
  getAllNotices: (params) =>
    api.get('/notices', { params }),
  getNoticeById: (id) =>
    api.get(`/notices/${id}`),
  createNotice: (data) =>
    api.post('/notices', data),
  updateNotice: (id, data) =>
    api.put(`/notices/${id}`, data),
  deleteNotice: (id) =>
    api.delete(`/notices/${id}`)
};

// Attendance API
export const attendanceAPI = {
  getAttendance: (params) =>
    api.get('/attendance', { params }),
  getMyAttendance: () =>
    api.get('/attendance/my-attendance'),
  markAttendance: (data) =>
    api.post('/attendance/mark', data),
  bulkMarkAttendance: (records) =>
    api.post('/attendance/bulk-mark', { records })
};

// Marks API
export const marksAPI = {
  getMarks: (params) =>
    api.get('/marks', { params }),
  getMyMarks: () =>
    api.get('/marks/my-marks'),
  addMarks: (data) =>
    api.post('/marks', data),
  updateMarks: (id, data) =>
    api.put(`/marks/${id}`, data),
  bulkAddMarks: (records) =>
    api.post('/marks/bulk-add', { records }),
  deleteMarks: (id) =>
    api.delete(`/marks/${id}`)
};

// Fee API
export const feeAPI = {
  getMyFees: () =>
    api.get('/fees/my-fees'),
  getAllFees: () =>
    api.get('/fees'),
  createFee: (data) =>
    api.post('/fees', data),
  updateFee: (id, data) =>
    api.put(`/fees/${id}`, data),
  deleteFee: (id) =>
    api.delete(`/fees/${id}`),
};

// Placement API
export const placementAPI = {
  getAll: () => api.get('/placements'),
  create: (data) => api.post('/placements', data),
  update: (id, data) => api.put(`/placements/${id}`, data),
  remove: (id) => api.delete(`/placements/${id}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getAllMessages: () => api.get('/contact'),
  markAsRead: (id) => api.put(`/contact/${id}/read`),
  deleteMessage: (id) => api.delete(`/contact/${id}`),
};

export default api;
