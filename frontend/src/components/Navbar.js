import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfileDropdown from './ProfileDropdown';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-icon') && !event.target.closest('.profile-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="logo-image" />
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn && (
          <li>
            <div onClick={toggleDropdown} className="profile-icon">
              <AccountCircleIcon />
            </div>
            {showDropdown && <ProfileDropdown onClose={() => setShowDropdown(false)} />}
          </li>
        )}
        <li><Link to="/modules">Modules</Link></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="navitem logout-button">Logout</button></li>
        ) : (
          <li><Link to="/login"><div className="navitem login-button">Login</div></Link></li>
        )}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/example">Example</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
