// App.js
import React, { useState } from 'react';
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm onSignup={handleLogin} />} />
        <Route path="/profile" element={<ProfileForm />} />
        {isLoggedIn && (
          <>
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<JobList />} />
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
