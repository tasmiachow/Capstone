import React, { useState } from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false); 
  const [userData, setUserData] = useState({
    name: 'John Doe',
    profilePic: './profile.png',
    about: 'I want to learn ASL',
    points: 400,
    nextLevelPoints: 500,
    badges: ['Beginner', 'Quiz Master'],
  });

  const progress = (userData.points / userData.nextLevelPoints) * 100;

  const toggleEditMode = () => {
    if (isEditing) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsEditing(false);
        setIsAnimatingOut(false);
      }, 300); 
    } else {
      setIsEditing(true); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="user-page">
      <div className={`profile-card ${isAnimatingOut ? 'slide-out' : 'slide-in'}`}>
        <div className="profile-section">
          <img src={userData.profilePic} alt="Profile" className="profile-pic" />
          <h2 className="profile-name">{userData.name}</h2>
        </div>
        <div className="user-about">
          <h3>About</h3>
          <p>{userData.about}</p>
        </div>
        <div className="points-section">
          <h3>Points: {userData.points}</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="next-level-points">{userData.nextLevelPoints - userData.points} points to next level</p>
        </div>
        <div className="badges-section">
          <h3>Badges</h3>
          <ul>
            {userData.badges.map((badge, index) => (
              <li key={index} className="badge">{badge}</li>
            ))}
          </ul>
        </div>
        <button onClick={toggleEditMode} className="edit-button">
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing && (
        <div className={`edit-form ${isAnimatingOut ? 'slide-out' : 'slide-in'}`}>
          <h3>Edit Profile</h3>
          <h4>Name</h4>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
          <h4>Description</h4>
          <textarea
            name="about"
            value={userData.about}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
          ></textarea>
          <button onClick={toggleEditMode}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
