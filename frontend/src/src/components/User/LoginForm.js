import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../helpers/api';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform login logic using API helper
      await api.login(username, password);
      navigate('/dashboard'); // Navigate to the dashboard or another route after successful login
    } catch (error) {
      console.error("Login Error:", error);
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
