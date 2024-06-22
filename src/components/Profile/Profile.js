// src/components/Profile.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Dashboard/Navbar'; // Import the main Navbar component
import './Profile.css'; // Import the CSS for the profile page

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    userhandle: '',
    profilePicture: '',
    banner: '',
    bio: ''
  });

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://your-api-endpoint.com/user')
      .then(response => response.json())
      .then(data => {
        setUserData({
          username: data.username,
          userhandle: data.userhandle,
          profilePicture: data.profilePicture,
          banner: data.banner,
          bio: data.bio
        });
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleBioChange = (e) => {
    setUserData({ ...userData, bio: e.target.value });
  };

  const handleSave = () => {
    // Save the updated bio to the API
    fetch('https://your-api-endpoint.com/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ bio: userData.bio })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Successfully saved bio:', data);
      })
      .catch(error => console.error('Error saving bio:', error));
  };

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src={userData.profilePicture } alt="Profile" />
            <h2>{userData.username}</h2>
            <p>@{userData.userhandle}</p>
          </div>
          <nav className="profile-nav">
            <ul>
              <li><a href="#info">Profile and Visibility</a></li>
              <li><a href="#activity">Activity</a></li>
              <li><a href="#cards">Cards</a></li>
              <li><a href="#settings">Settings</a></li>
            </ul>
          </nav>
        </div>
        <div className="profile-main">
          <section id="info">
            <h2>Profile and Visibility</h2>
            <div className="profile-info">
              <div className="profile-banner">
                <img src={userData.banner } alt="Banner" />
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
                    <label>Bio</label>
                    <textarea value={userData.bio} onChange={handleBioChange}></textarea>
                  </div>
                  <button onClick={handleSave}>Save</button>
                </div>
              </div>
            </div>
          </section>
          <section id="activity">
            <h2>Activity</h2>
            <p>Activity content goes here.</p>
          </section>
          <section id="cards">
            <h2>Cards</h2>
            <p>Cards content goes here.</p>
          </section>
          <section id="settings">
            <h2>Settings</h2>
            <p>Settings content goes here.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Profile;
