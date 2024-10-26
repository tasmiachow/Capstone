import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="logo-image" />;
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/modules">Modules</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
