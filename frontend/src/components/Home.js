import React from 'react';
import { Link } from 'react-router-dom';

function Home({ isLoggedIn }) {
  return (
    <div className="home">
      <h1>Jobly</h1>
      {!isLoggedIn ? (
        <div>
          <Link to="/login">Log In</Link>
          <span> or </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      ) : (
        <h2>Welcome Back!</h2>
      )}
    </div>
  );
}

export default Home;
