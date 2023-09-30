import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginForm from './components/User/LoginForm';
import SignupForm from './components/User/SignupForm';
import ProfileForm from './components/User/ProfileForm';
import NotFound from './components/NotFound';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderRoot = () => {
    return isLoggedIn ? <Navigate to="/Home" replace /> : <LoginForm onLogin={handleLogin} />;
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={renderRoot()} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
