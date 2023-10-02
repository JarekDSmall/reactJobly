import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginForm from './components/User/LoginForm';
import SignupForm from './components/User/SignupForm';
import ProfileForm from './components/User/ProfileForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Companies from './components/Companies/Companies';
import CompanyDetail from './components/Companies/CompanyDetail';
import JobList from './components/Jobs/JobList';

const TOKEN_KEY = 'jwtToken';  // Updated key

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage on initial render
    const token = localStorage.getItem(TOKEN_KEY); // Use TOKEN_KEY constant
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem(TOKEN_KEY, token); // Store token in localStorage using TOKEN_KEY
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY); // Remove token from localStorage using TOKEN_KEY
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
    
        {isLoggedIn && (
          <>
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/profile" element={<ProfileForm />} />
          </>
        )}
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
