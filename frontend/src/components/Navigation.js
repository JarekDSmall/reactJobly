import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, onLogout }) {
  return (
    <nav>
      <Link to="/Home">Home</Link> {/* Added a link to the Home page with the title "Jobly" */}
      {isLoggedIn ? (
        <>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={onLogout}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
