import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const userData = {
    name: 'John Doe',
    profilePic: './profile.png',
    about:'I want to learn ASL',
    points:1300,
    nextLevelPoints: 1500,
    badges: ['Beginner', 'Quiz Master'], 
  };

  const progress = (userData.points / userData.nextLevelPoints) * 100;

  return (
    <div className="user-page">
      <div className="profile-section">
        <img src={userData.profilePic} alt="Profile" className="profile-pic" />
        <h2>{userData.name}</h2>
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
        <p>{userData.nextLevelPoints - userData.points} points to next level</p>
      </div>
      <div className="badges-section">
        <h3>Badges</h3>
        <ul>
          {userData.badges.map((badge, index) => (
            <li key={index} className="badge">{badge}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
