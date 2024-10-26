import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../styles/Capture.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="Capture" className="capture-image" />;
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/modules">Modules</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
