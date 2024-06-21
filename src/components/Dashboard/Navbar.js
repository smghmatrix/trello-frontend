// src/components/Navbar.js

import React from 'react';
import './Navbar.css'; // Import CSS for styling

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="navbar-menu">
          <a href="/workspace">Workspace</a>
          <a href="/tasks">Tasks</a>
          <a href="/profile">Profile</a>
        </div>
      </div>
      <div className="navbar-right">
        <a href="/logout">Logout</a>
      </div>
    </div>
  );
}

export default Navbar;
