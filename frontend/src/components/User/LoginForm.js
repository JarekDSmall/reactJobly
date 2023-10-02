import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';
import Cookies from 'js-cookie'; // Importing js-cookie

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const receivedToken = await api.login(formData);
      Cookies.set('token', receivedToken); // Set the token using js-cookie
      setMessage('Login successful! Redirecting to dashboard...');
      onLogin();
      navigate('/Home');
    } catch (error) {
      console.error("Login Error:", error);
      setMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button type="submit" disabled={loading}>Login</button>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
}

export default LoginForm;
