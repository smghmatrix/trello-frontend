// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="navbar-menu">
        <NavLink to="/workspace" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Workspace</NavLink>
        <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Dashboard</NavLink>
        <NavLink to="/tasks" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Tasks</NavLink>
        <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Profile</NavLink>
        </div>
      </div>
      <div className="navbar-right">
        <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
