import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.css'; // Import the common CSS file

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

    if (!formData.username) {
      validationErrors.username = "Username is required";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    }

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      validationErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission logic here
      console.log(formData);
      setErrors({});
    }
  };

  return (
    <div className="container">
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
