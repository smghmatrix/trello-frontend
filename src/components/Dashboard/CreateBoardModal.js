import React, { useState, useEffect } from 'react';
import './CreateBoardModal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBoardModal({ show, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (show) {
      fetch(`${process.env.REACT_APP_API_URL}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserList(data.users);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [show]);

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
    toast.success('Board created successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-create-board">
        <ToastContainer />
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
              .filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
              .map(user => (
                <li key={user.id} onClick={() => handleAddMember(user.username)}>
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
