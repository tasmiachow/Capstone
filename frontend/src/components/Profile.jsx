import React, { useState, useEffect } from 'react';
import '../styles/Profile.css';
import SettingsIcon from '@mui/icons-material/Settings';
import { getDoc, doc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import Footer from './Footer';

const profilePics = [
  'Profile_Pic/browngirl.png',
  'Profile_Pic/brownman.png',
  'Profile_Pic/cat.png',
  'Profile_Pic/girl.png',
  'Profile_Pic/man.png',
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    profilePic: '',
    about: '',
    points: 0,
    nextLevelPoints: 0,
    badges: [],
  });
  const [loading, setLoading] = useState(true);
  const [profilePicFile] = useState(null);
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          console.log('Fetching user data for UID:', user.uid);
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              ...data,
              points: data.points || 0,
              nextLevelPoints: data.nextLevelPoints || 0,
              badges: data.badges || [],
            });
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is signed in.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setUserData({
          name: '',
          profilePic: '',
          about: '',
          points: 0,
          nextLevelPoints: 0,
          badges: [],
        });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            points: data.points,
          };
        });
        const sortedUsers = usersList.sort((a, b) => b.points - a.points);
        setAllUsersData(sortedUsers);
      } catch (error) {
        console.error('Error fetching all users data:', error);
      }
    };

    fetchAllUsersData();
  }, []);

  const progress = userData.nextLevelPoints ? (userData.points / userData.nextLevelPoints) * 100 : 0;

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

  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     setProfilePicFile(e.target.files[0]);
  //   }
  // };

  const handleProfilePicSelect = (pic) => {
    setUserData({ ...userData, profilePic: pic });
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (profilePicFile) {
          const profilePicRef = ref(storage, `profile_pics/${user.uid}`);
          await uploadBytes(profilePicRef, profilePicFile);
          const profilePicURL = await getDownloadURL(profilePicRef);
          userData.profilePic = profilePicURL;
        }

        await updateDoc(doc(db, 'users', user.uid), userData);
        setIsEditing(false);
        setIsAnimatingOut(false);
        console.log('User data updated successfully');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert(`Failed to update user data: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="user-page">
      <div className={`profile-card ${isAnimatingOut ? 'slide-out' : 'slide-in'}`}>
        <button onClick={toggleEditMode} className="edit-button">
          {isEditing ? 'Cancel' : <SettingsIcon />}
        </button>
        <div className="profile-section">
          <img src={userData.profilePic || './profile.png'} alt="Profile" className="profile-pic" />
          <h2 className="profile-name">{userData.name || 'No Name'}</h2>
        </div>
        <div className="user-about">
          <h3>About</h3>
          <p>{userData.about || 'No description available'}</p>
        </div>
        <div className="points-section">
          <h3>Points: {userData.points}</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="next-level-points">{userData.nextLevelPoints ? userData.nextLevelPoints - userData.points : '0'} points to next level</p>
        </div>
        <div className="badges-section">
          <h3>Badges</h3>
          <ul>
            {userData.badges.map((badge, index) => (
              <li key={index} className="badge">
                <div className="badge-container">
                  <img src={require(`../Badges/${badge.icon}`)} alt={badge.name} className="badge-icon" />
                  <div className="badge-hover-info">
                    <h4>{badge.name}</h4>
                    <p>{badge.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isEditing && (
        <div className={`edit-form ${isAnimatingOut ? 'slide-out' : 'slide-in'}`}>
          <h3>Edit Profile</h3>
          <h4>Profile Image</h4>
          <div className="profile-pic-selection">
            {profilePics.map((pic, index) => (
              <img
                key={index}
                src={`./${pic}`}
                alt={`Profile ${index}`}
                className={`selectable-pic ${userData.profilePic === pic ? 'selected' : ''}`}
                onClick={() => handleProfilePicSelect(pic)}
              />
            ))}
          </div>
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
          <button className='save' onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}
        <div className="leaderboard-section">
          <h3>Leaderboard</h3>
            {allUsersData.map((user, index) => (
              <p key={user.id} className="leaderboard-entry">
                <span className="leaderboard-rank">#{index + 1}</span>
                <span className="leaderboard-name">{user.name}</span>
                <span className="leaderboard-points">{user.points} points</span>
              </p>
            ))}
        </div>
      </div>
      <Footer/>
      </>
  );
};

export default Profile;
