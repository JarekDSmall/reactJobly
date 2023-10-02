import React, { useState, useEffect } from 'react';
import api from '../../helpers/api';
import Cookies from 'js-cookie'; // Importing js-cookie
import './FormStyles.css';

function getUsernameFromToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).username;
  } catch (e) {
    return null;
  }
}

function ProfileForm() {
  const token = Cookies.get('token'); // Get the token using js-cookie
  const initialUsername = getUsernameFromToken(token) || '';
  const [username] = useState(initialUsername);
  const [password, setPassword] = useState(''); // State for current password
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;

      try {
        const userProfile = await api.getProfile(username);
        setEmail(userProfile.email);
        setFirstName(userProfile.firstName);
        setLastName(userProfile.lastName);
      } catch (error) {
        console.error("Profile Error:", error);
      }
    };
  
    fetchProfile();
  }, [username]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      // Construct the userData object with the username and other form data
      const userData = {
        username, // This is the username from the state or derived from the token
        password,
        firstName,
        lastName,
        email
      };

      await api.updateProfile(userData); // Call the updateProfile function with the userData object
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage(''); // Clear any previous error messages
    } catch (error) {
      console.error("Profile Update Error:", error);
      setErrorMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
};


  return (
    <div style={{ padding: '20px' }}>
      {loading && <p>Loading...</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} readOnly />
        </label>
        <label>
          Current Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
