import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    if (!formData.username) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      fetch('https://your-api-endpoint/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            toast.success('Signup successful! Please log in.', {
              position: "top-right",
              autoClose: 3000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: 'Toastify__toast--success',
            });
          } else {
            toast.error('Signup failed. Please try again.', {
              position: "top-right",
              autoClose: 3000, 
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: 'Toastify__toast--error',
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again.', {
            position: "top-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'Toastify__toast--error',
          });
        });
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className={errors.password ? 'error-input' : ''}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p className="link">
        Already registered? <Link to="/login">Click here to login</Link>
      </p>
    </div>
  );
}

export default Signup;
