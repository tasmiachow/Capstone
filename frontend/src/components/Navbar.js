import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';


const Navbar = () => {
  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="logo-image" />
      <ul>
        <li><Link to="/"><div className='navitem'><HomeIcon fontSize='medium'/></div></Link></li>
        <li><Link to="/About"><div className='navitem'><InfoIcon fontSize='small'/></div></Link></li>
        <li><Link to="/modules"><div className='navitem'><MenuBookIcon fontSize='small'/></div></Link></li>
        <li><Link to="/Profile"><div className='navitem'><AccountCircleIcon fontSize='small'/></div></Link></li>
        <li><Link to="/login"><div className="navitem login-button">Login</div></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
