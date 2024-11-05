import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <nav className="navbar">
      <img src="/logo.png" alt="logo" className="logo-image" />
      <ul>
        <li><Link to="/">Home</Link></li>
        {isLoggedIn && <li><Link to="/Profile">Profile</Link></li>}
        <li><Link to="/modules">Modules</Link></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout} className="navitem logout-button">Logout</button></li>
        ) : (
          <li><Link to="/login"><div className="navitem login-button">Login</div></Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
