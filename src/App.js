// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Tasks from './components/Tasks/Tasks';
import Profile from './components/Profile/Profile';
import CreateBoardModal from './components/Dashboard/CreateBoardModal';
import Navbar from './components/Dashboard/Navbar';

function App() {
  const location = useLocation();

  const isCreateBoardRoute = location.pathname === '/create-board';

  const handleCreateBoard = (boardData) => {
    console.log('Board Created:', boardData);
    // Add logic to save the board data to your backend or state
  };

  const handleCloseModal = () => {
    window.history.back(); // Go back to the previous route
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-board" element={<></>} /> {/* Placeholder for the route */}
      </Routes>
      {isCreateBoardRoute && (
        <CreateBoardModal show={true} onClose={handleCloseModal} onCreate={handleCreateBoard} />
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
