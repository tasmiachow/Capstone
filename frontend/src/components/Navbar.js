import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

{/* <li><Link to="/"><div className='navitem'><HomeIcon fontSize='medium'/></div></Link></li>
<li><Link to="/About"><div className='navitem'><InfoIcon fontSize='small'/></div></Link></li>
<li><Link to="/modules"><div className='navitem'><MenuBookIcon fontSize='small'/></div></Link></li>
<li><Link to="/Profile"><div className='navitem'><AccountCircleIcon fontSize='small'/></div></Link></li> */}

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="logo-image" />;
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/About">About</Link></li>
        <li><Link to="/Profile">Profile</Link></li>
        <li><Link to="/modules">Modules</Link></li>
        <li><Link to="/login"><div className="navitem login-button">Login</div></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
