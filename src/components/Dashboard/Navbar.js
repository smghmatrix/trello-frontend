// src/components/Navbar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import CreateBoardModal from './CreateBoardModal'; // Import the CreateBoardModal component

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="navbar-menu">
          <NavLink to="/dashboard" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Dashboard</NavLink>
          <NavLink to="/tasks" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Tasks</NavLink>
          <NavLink to="/profile" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Profile</NavLink>
          <NavLink to="/create-board" style={({ isActive }) => ({ color: isActive ? 'red' : 'white' })}>Create Board</NavLink>
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
