import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home({ isLoggedIn }) {
  console.log("Is Logged In:", isLoggedIn);
  const username = localStorage.getItem('username'); // Assuming you store the username in local storage

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
        <h2>Welcome Back, {username}!</h2> // Displaying the username
      )}
    </div>
  );
}

export default Home;
