import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ isLoggedIn }) {
  console.log("Is Logged In:", isLoggedIn);

  return (
    <div className="home">
      <h1>Jobly</h1>
      {!isLoggedIn ? (
        <div className="login-signup-options">
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
