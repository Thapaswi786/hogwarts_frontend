import React from 'react';
import { NavLink, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const dashboardPath =
    user?.role === 'admin' ? '/admin' :
    user?.role === 'teacher' ? '/teacher' :
    user?.role === 'student' ? '/student' : '/login';

  return (
    <header>
      <div className="navbar">
        <Link to="/" className="brand">
          <img src={logo} alt="Hogwarts University logo" className="logo" />
          <div>
            <h1>Hogwarts University</h1>
            <p>College Management System</p>
          </div>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/admission">Admission</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to={dashboardPath}>Dashboard</NavLink>
              <button type="button" className="login-btn nav-login-as-logout" onClick={() => { logout(); }}>
                Login
              </button>
            </>
          ) : (
            <NavLink to="/login" className="login-btn">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
