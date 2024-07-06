import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
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

    if (!formData.first_name) {
      validationErrors.first_name = "First name is required";
    }

    if (!formData.last_name) {
      validationErrors.last_name = "Last name is required";
    }

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
      
      // Adding additional fields for testing
      const payload = {
        ...formData,
      };

      fetch(`${process.env.REACT_APP_API_URL}/users/`, {  // Use environment variable here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(({ status, body }) => {
          if (status === 200) {
            toast.success(`Signup successful! Please log in ${formData.username}`, {
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
            toast.error(`${body}`, {
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
          <label>First Name:</label>
          <input 
            type="text" 
            name="first_name" 
            value={formData.first_name} 
            onChange={handleChange} 
            className={errors.first_name ? 'error-input' : ''}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="last_name" 
            value={formData.last_name} 
            onChange={handleChange} 
            className={errors.last_name ? 'error-input' : ''}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>
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
