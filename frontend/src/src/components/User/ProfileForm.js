import React, { useState, useEffect } from 'react';
import api from '../../helpers/api';

function ProfileForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await api.getProfile();
        setUsername(profile.username);
        setEmail(profile.email);
      } catch (error) {
        console.error("Profile Error:", error);
        // Handle profile fetch error
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Perform profile update logic using API helper
      await api.updateProfile({ username, email });
      // Handle successful profile update
    } catch (error) {
      console.error("Profile Update Error:", error);
      // Handle profile update error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default ProfileForm;
