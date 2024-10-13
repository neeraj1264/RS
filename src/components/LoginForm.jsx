import React, { useState } from 'react';
import './LoginForm.css'; // Assuming you have a CSS file for styling
import { Link , useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    em: '',
    password: '',
    remember: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Array of users with their emails and passwords
  const users = [
    { email: 'manchandaneeraj396@gmail.com', password: '12345' },
    { email: 'neerajm1264@gmail.com', password: '12345' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered email and password match any user in the users array
    const user = users.find(
      (user) => user.email === formData.em && user.password === formData.password
    );

    if (user) {
      // Successful login
      console.log('Login successful!');
      setErrorMessage(''); // Clear any previous error message
      navigate("/video");
    } else {
      // Display an error message if credentials are incorrect
      setErrorMessage('Incorrect email or password.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email or Mobile</label>
          <input
            type="text"
            className="form-control"
            name="em"
            placeholder="Enter mobile or email"
            required
            value={formData.em}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <span id="toc">Remember Me</span>
          </div>
        </div>
        <button type="submit" className="login-btn">Submit</button>

        {/* Display error message if login fails */}
        {errorMessage && (
          <p className="error-message" style={{ color: 'red' }}>
            {errorMessage}
          </p>
        )}

        <p className="mt-2 text-center">
          Not registered yet? <Link to="/">Create an Account</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
