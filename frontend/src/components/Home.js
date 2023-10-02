import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importing js-cookie
import './Home.css';

// Utility function to extract username from the token
function getUsernameFromToken() {
  const token = Cookies.get('token');
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)).username;
  } catch (e) {
    return null;
  }
}

function Home({ isLoggedIn }) {
  const username = getUsernameFromToken(); // Get the username when the component renders

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
        <h2>Welcome Back, {username}!</h2> 
      )}
    </div>
  );
}

export default Home;
