import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css'; // Import the common CSS file

function Login() {
  const [formData, setFormData] = useState({
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

    if (!formData.email) {
      validationErrors.email = "Email is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Clear previous errors
      setErrors({});

      // Send API request
      fetch('https://your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            toast.success('Login successful!', {
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

            toast.error('Login failed. Please check your credentials.', {
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p className="link">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
