import React from 'react';
import '../styles/Profile.css';

const Profile = () => {
  const userData = {
    name: 'John Doe',
    profilePic: './profile.png',
    points: 1200,
    nextLevelPoints: 1500,
    recentActivities: [
      { activity: 'Completed Lesson 1', points: 50, date: '2024-10-25' },
      { activity: 'Logged in Daily', points: 20, date: '2024-10-24' },
    ],
    badges: ['Beginner Badge', 'Quiz Master'], 
  };

  const progress = (userData.points / userData.nextLevelPoints) * 100;

  return (
    <div className="user-page">
      <div className="profile-section">
        <img src={userData.profilePic} alt="Profile" className="profile-pic" />
        <h2>{userData.name}</h2>
      </div>
      <div className="points-section">
        <h3>Points: {userData.points}</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p>{userData.nextLevelPoints - userData.points} points to next level</p>
      </div>
      <div className="recent-activity-section">
        <h3>Recent Activities</h3>
        <ul>
          {userData.recentActivities.map((activity, index) => (
            <li key={index}>
              <strong>{activity.activity}</strong> - {activity.points} points on {activity.date}
            </li>
          ))}
        </ul>
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
