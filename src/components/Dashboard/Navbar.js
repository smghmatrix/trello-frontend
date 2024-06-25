// src/components/Navbar.js

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import CSS for styling
import CreateBoardModal from '../Dashboard/CreateBoardModal'; // Import the CreateBoardModal component

function Navbar() {
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const handleCreateBoardClick = () => {
    setShowCreateBoardModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateBoardModal(false);
  };

  const handleCreateBoard = (boardData) => {
    console.log('Board Created:', boardData);
    // Add logic to save the board data to your backend or state
  };

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
        <button className="create-board-button" onClick={handleCreateBoardClick}>Create Board</button>
        <NavLink to="/logout" className={({ isActive }) => (isActive ? 'active-link' : '')}>
          <img src="/logout-icon.png" alt="Logout" className="logout-icon" />
          Logout
        </NavLink>
      </div>
      <CreateBoardModal show={showCreateBoardModal} onClose={handleCloseModal} onCreate={handleCreateBoard} />
    </div>
  );
}

export default Navbar;
