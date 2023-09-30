import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';

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
    console.log("Updated formData:", formData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.login(formData);  // Pass the entire formData object
      setMessage('Login successful! Redirecting to dashboard...');
      onLogin();
      navigate('/Home');  // Redirect to the Home page after successful login
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
