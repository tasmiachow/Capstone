import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import ProfileDropdown from './ProfileDropdown';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const fetchProfilePic = async (uid) => {
      try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const profilePicName = data.profilePic;
          const profilePicUrl = profilePicName ? `/${profilePicName}` : '/default-profile.png';
          setProfilePic(profilePicUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchProfilePic(user.uid);
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
      <a href="/">
        <img src="/logo.png" alt="logo" className="logo-image" />
      </a>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/modules">Modules</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        {isLoggedIn && (
          <li>
            <div onClick={toggleDropdown} className="profile-icon">
              <img src={profilePic} alt="Profile" className="nav-profile-pic" />
            </div>
            {showDropdown && <ProfileDropdown onClose={() => setShowDropdown(false)} />}
          </li>
        )}
        {/* <li><Link to="/example">Example</Link></li> */}
        {isLoggedIn ? (
          <li></li>
        ) : (
          <li><Link to="/login"><div className="navitem login-button">Login</div></Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
