// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar'; // Import the main Navbar component
import './Profile.css'; // Import the CSS for the profile page
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const USER_ID = 2; // Static ID for testing purposes

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    profilePicture: '',
    banner: '',
    bio: ''
  });

  const [newPassword, setNewPassword] = useState(''); // New state for the password
  const [profilePicture, setProfilePicture] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    fetch(`${process.env.REACT_APP_API_URL}/users/${USER_ID}/`, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserData({
          username: data.username,
          email: data.email,
          profilePicture: data.avatar,
          banner: data.banner,
          bio: data.bio
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleBioChange = (e) => {
    setUserData({ ...userData, bio: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleSave = () => {
    const updatedUserData = {
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
      avatar: profilePicture ? URL.createObjectURL(profilePicture) : null,
      banner: banner ? URL.createObjectURL(banner) : null,
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/${USER_ID}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(updatedUserData),
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status === 200) {
        toast.success('Profile updated successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        toast.error(JSON.stringify(body), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  })
      .catch(error => {
        console.error('Error updating profile:', error);
        toast.error('An error occurred. Please try again.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
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
            <img src={userData.profilePicture} alt="Profile" />
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
                <img src={userData.banner} alt="Banner" />
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
                  <div className="profile-field">
                    <label>Profile Picture</label>
                    <input type="file" onChange={handleProfilePictureChange} />
                  </div>
                  <div className="profile-field">
                    <label>Banner</label>
                    <input type="file" onChange={handleBannerChange} />
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
