// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar'; // Import the main Navbar component
import './Profile.css'; // Import the CSS for the profile page
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    userhandle: '',
    profilePicture: '',
    banner: '',
    bio: ''
  });
  
  const [newPassword, setNewPassword] = useState(''); // New state for the password

  useEffect(() => {
    // Mock JSON object for testing
    const mockData = {
      username: 'John Doe',
      email: 'seyed@gmail.com',
      profilePicture: '/logo1.png',
      banner: '/logo2.png',
      bio: 'This is a mock bio for testing purposes.'
    };

    // Simulate fetching data from an API
    setTimeout(() => {
      setUserData(mockData);
    }, 1000); // Simulate a network delay

  }, []);

  const handleBioChange = (e) => {
    setUserData({ ...userData, bio: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = () => {
    // Simulate saving the updated profile to an API
    console.log('Saved profile:', userData);
    toast.success('Profile updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleResetPassword = () => {
    // Simulate resetting the password via an API
    console.log('Password reset to:', newPassword);
    toast.success('Password reset successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setNewPassword(''); // Clear the password field after resetting
  };

  const handleDeleteAccount = () => {
    // Simulate deleting the account via an API
    console.log('Account deleted');
    toast.error('Account deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Add any additional logic here, such as redirecting to a different page
  };

  return (
    <div className="profile-container">
      <Navbar />
      <ToastContainer />
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src={userData.profilePicture || "/logo512.png"} alt="Profile" />
            <h2>{userData.username}</h2>
            <p>{userData.email}</p>
          </div>
          <nav className="profile-nav">
            <ul>
              <li><a href="#info">Profile and Visibility</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </nav>
        </div>
        <div className="profile-main">
          <section id="info">
            <h2>Profile and Visibility</h2>
            <div className="profile-info">
              <div className="profile-banner">
                <img src={userData.banner || "/logo.jpeg"} alt="Banner" />
              </div>
              <div className="profile-details">
                <h3>Manage your personal information</h3>
                <div className="profile-about">
                  <h4>About</h4>
                  <div className="profile-field">
                    <label>Username</label>
                    <input type="text" value={userData.username} readOnly />
                  </div>
                  <div className="profile-field">
                    <label>Email</label>
                    <textarea value={userData.email} onChange={handleEmailChange}></textarea>
                    <label>Bio</label>
                    <textarea value={userData.bio} onChange={handleBioChange}></textarea>
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          </section>
          <section id="settings">
            <h2>Settings</h2>
            <div className="profile-field">
              <label>New Password</label>
              <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
            </div>
            <button className="reset-password-button" onClick={handleResetPassword}>Reset Password</button>
            <button className="delete-account-button" onClick={handleDeleteAccount}>Delete Account</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
