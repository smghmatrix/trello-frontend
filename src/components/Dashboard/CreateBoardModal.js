// src/components/CreateBoardModal.js

import React, { useState } from 'react';
import './CreateBoardModal.css';

function CreateBoardModal({ show, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([
    { username: 'user1' },
    { username: 'user2' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },
    { username: 'user3' },


    // Add more mock users here or fetch from an API
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddMember = (username) => {
    if (!members.includes(username)) {
      setMembers([...members, username]);
    }
  };

  const handleCreateBoard = () => {
    onCreate({ title, description, members });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button2" onClick={onClose}>X</button>
        <h2>Create Board</h2>
        <div className="modal-content">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          <label>Members</label>
          <input type="text" placeholder="Search users" value={search} onChange={handleSearch} />
          <ul className="user-list">
            {userList
              .filter(user => user.username.includes(search))
              .map(user => (
                <li key={user.username} onClick={() => handleAddMember(user.username)}>
                  {user.username}
                </li>
              ))}
          </ul>
          <div className="selected-members">
            {members.map(member => (
              <span key={member} className="member-tag">{member}</span>
            ))}
          </div>

          <button onClick={handleCreateBoard}>Create Board</button>
        </div>
      </div>
    </div>
  );
}

export default CreateBoardModal;
