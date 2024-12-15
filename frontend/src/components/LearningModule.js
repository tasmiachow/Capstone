/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../styles/LearningModule.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import beginnerBadge from '../Badges/beginner.json';
import intermediateBadge from '../Badges/intermediate.json';
import hardBadge from '../Badges/hard.json';
import Example from './example';

const LearningModule = () => {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isVisible: false, message: '' });
  const [hoverIndex, setHoverIndex] = useState(null);

  const lessons = {
    Beginner: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5'],
    Intermediate: ['Lesson 6', 'Lesson 7', 'Lesson 8', 'Lesson 9', 'Lesson 10'],
    Hard: ['Lesson 11', 'Lesson 12', 'Lesson 13', 'Lesson 14', 'Lesson 15'],
  };

  const lessonContent = {
    'Lesson 1': {
      text: 'Hello',
      video: '/Aslvid/Greetings/Hello.mp4',
      description: 'To sign "Hello," simply raise your hand in front of the camera and give a friendly wave.'
    },
    'Lesson 2': {
      text: 'Good Morning',
      video: '/Aslvid/Alphabet/C.png',
    },
    'Lesson 3': {
      text: 'Bye',
      video: '/Aslvid/Alphabet/E.png'
    },
    'Lesson 4': {
      text: 'L',
      video: '/Aslvid/Alphabet/L.png'
    },
    'Lesson 5': {
      text: 'O',
      video: '/Aslvid/Alphabet/O.png'
    },
    'Lesson 6': {
      text: 'Angry',
      video: '/Aslvid/Emotions/Angry.mp4',
      description: 'The sign for "angry" uses a single motion. If you use a double motion and a slightly less intense face it can mean "grouchy" or "grumpy." Try not to actually touch your face while doing this sign.'
    },
    'Lesson 7': {
      text: 'Happy',
      video: '/Aslvid/Emotions/Happy.mp4',
    },
    'Lesson 8': {
      text: 'Sad',
      video: '/Aslvid/Emotions/Sad.mp4',
    },
    'Lesson 9': {
      text: 'Confused',
      video: '/Aslvid/Emotions/Confused.mp4',
    },
    'Lesson 10': {
      text: 'Calm',
      video: '/Aslvid/Emotions/Calm.mp4',
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProgress(userDoc.data().progress || {});
        } else {
          await setDoc(doc(db, 'users', user.uid), { progress: {}, points: 0 });
        }
      }
      setLoading(false);
    };

    fetchUserData();
   }, []);

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const handleLessonClick = (lesson) => {
    const isUnlocked = isLessonUnlocked(lesson);
    if (isUnlocked) {
      if (selectedLesson === lesson) {
        setIsAnimatingOut(true);
        setTimeout(() => {
          setSelectedLesson(null);
          setIsAnimatingOut(false);
        }, 400);
      } else {
        setIsAnimatingOut(true);
        setTimeout(() => {
          setSelectedLesson(null); // temporarily deselect new lesson to reactivate slide animation
          setIsAnimatingOut(false);
          setTimeout(() => {
            setSelectedLesson(lesson); // reselect
          }, 1);
        }, 400);
      }
    } else {
      setModal({
        isVisible: true,
        message: `Complete previous lessons to unlock "${lesson}".`,
      });
    }
  };

  const isLessonUnlocked = (lesson) => {
    const currentLevel = Object.keys(lessons).find(level => lessons[level].includes(lesson));
    if (!currentLevel) {
      console.error(`Current Level for ${lesson} not found.`);
      return false;
    }
  
    const currentLessons = lessons[currentLevel];
    const lessonIndex = currentLessons.indexOf(lesson) + 1;  // Find the 1-based index of the lesson in the current level
    const levelIndex = Object.keys(lessons).indexOf(currentLevel);
  
    // console.log(`Checking if ${lesson} is unlocked.`);
    // console.log(`Current Level: ${currentLevel}`);
    // console.log(`Lesson Index: ${lessonIndex}`);
  
    // check if it is the first level's first lesson
    if (lessonIndex === 1 && levelIndex === 0) {
      return true;
    }
  
    // check if all previous lessons in the same level are completed
    for (let i = 0; i < lessonIndex - 1; i++) {
      const previousLesson = currentLessons[i];
      if (!userProgress[previousLesson]?.completed) {
        setModal({
          isVisible: true,
          message: `${lesson} is not unlocked because "${previousLesson}" is not completed.`,
        });
        return false;
      }
    }
  
    // check if all lessons in previous levels are completed if it is the first lesson in the level
    if (lessonIndex === 1) {
      for (let i = 0; i < levelIndex; i++) {
        const previousLevelLessons = lessons[Object.keys(lessons)[i]];
        for (let j = 0; j < previousLevelLessons.length; j++) {
          if (!userProgress[previousLevelLessons[j]]?.completed) {
            setModal({
              isVisible: true,
              message: `${lesson} is not unlocked because "${previousLevelLessons[j]}" from a previous level is not completed.`,
            });
            return false;
          }
        }
      }
    }
  
    console.log(`${lesson} is unlocked.`);
    return true;
  };

  const closeModal = () => {
    setModal({ isVisible: false, message: '' });
  };
  const openLevelModal = () => {
    setShowLevelModal(true);
  };

  const closeLevelModal = () => {
    setShowLevelModal(false);
  };

  const updateProgress = async (lesson) => {
    const user = auth.currentUser;
    if (user) {
      const newProgress = {
        ...userProgress,
        [lesson]: { completed: true }
      };
      const userRef = doc(db, 'users', user.uid);
      const userData = await getDoc(userRef);
      await updateDoc(userRef, { progress: newProgress });
      setUserProgress(newProgress);
    }
  };

  const handleLessonComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      const completed = userProgress[selectedLesson]?.completed;
      const pointsToAdd = completed ? 50 : 100;

      const newProgress = {
        ...userProgress,
        [selectedLesson]: { completed: true }
      };
      const userRef = doc(db, 'users', user.uid);
      const userData = await getDoc(userRef);
      await updateDoc(userRef, { progress: newProgress, points: userData.data().points + pointsToAdd });
      setUserProgress(newProgress);

      if (completed) {
        alert("Lesson revisited and 50 points awarded!");
      } else {
        alert("Lesson completed and 100 points awarded!");
      }

      checkAndAwardBadges(newProgress, userRef);
    }
  };

  const handleNextLesson = async () => {
    if (!selectedLesson) return;

    const currentLevel = Object.keys(lessons).find(level => lessons[level].includes(selectedLesson));
    const currentLessons = lessons[currentLevel];
    const lessonIndex = currentLessons.indexOf(selectedLesson);

    if (lessonIndex < currentLessons.length - 1) {
      const nextLesson = currentLessons[lessonIndex + 1];
      handleLessonClick(nextLesson);
    } else {
      const nextLevelIndex = Object.keys(lessons).indexOf(currentLevel) + 1;
      if (nextLevelIndex < Object.keys(lessons).length) {
        // check if all lessons in the current level are completed before unlocking the next level
        const allCurrentLessonsCompleted = currentLessons.every(lesson => userProgress[lesson]?.completed);
        if (allCurrentLessonsCompleted) {
          const nextLevel = Object.keys(lessons)[nextLevelIndex];
          const nextLesson = lessons[nextLevel][0];
          handleLessonClick(nextLesson);
        } else {
          alert("Complete all lessons in the current level to unlock the next level.");
        }
      } else {
        alert("All lessons completed!");
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleBackClick = () => {
    setSelectedLesson(null);
    setIsSidebarVisible(true);
  };

  const checkAndAwardBadges = async (userProgress, userRef) => {
    const beginnerLessons = lessons.Beginner;
    const intermediateLessons = lessons.Intermediate;
    const hardLessons = lessons.Hard;

    const allBeginnerCompleted = beginnerLessons.every(lesson => userProgress[lesson]?.completed);
    const allIntermediateCompleted = intermediateLessons.every(lesson => userProgress[lesson]?.completed);
    const allHardCompleted = hardLessons.every(lesson => userProgress[lesson]?.completed);

    const userData = await getDoc(userRef);
    const userBadges = userData.data().badges || [];

    if (allBeginnerCompleted && !userBadges.some(badge => badge.name === beginnerBadge.name)) {
      await assignBadge(userRef, beginnerBadge, userBadges);
    }
    if (allIntermediateCompleted && !userBadges.some(badge => badge.name === intermediateBadge.name)) {
      await assignBadge(userRef, intermediateBadge, userBadges);
    }
    if (allHardCompleted && !userBadges.some(badge => badge.name === hardBadge.name)) {
      await assignBadge(userRef, hardBadge, userBadges);
    }
  };

  const assignBadge = async (userRef, badge, currentBadges) => {
    const updatedBadges = [...currentBadges, badge];
    await updateDoc(userRef, { badges: updatedBadges });
    console.log('Badge assigned:', badge.name);
  };

  if (loading) {
    return <img src="/loading.gif" alt="Loading" className="loading-rotate"/>;
  }

  return (
    <div className="learning-module-container">
      <h1>Learning Module</h1>
      <div className="content">
        {/* Levels Sidebar */}
        {selectedLesson === null && (
          <div className={`levels-sidebar ${isSidebarVisible ? '' : 'collapsed'}`}>
            {Object.keys(lessons).map((level) => (
              <div className="level" key={level}>
                <p className="level-button" onClick={() => toggleLevel(level)}>
                  {level}
                </p>
                {expandedLevel === level && (
                  <div className="lesson-list">
                    {lessons[level].map((lesson, index) => {
                      const isCompleted = userProgress[lesson]?.completed;
                      return (
                          <p key={lesson} className={`lesson-item ${isCompleted ? 'completed' : ''} ${hoverIndex === index ? 'hover' : ''}`}
                          onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)} 
                          onClick={() => handleLessonClick(lesson)}
                          >
                            <span className={`text ${hoverIndex === index ? 'hover' : ''}`}>{lesson}</span>
                          </p>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Expand Sidebar Button */}
        {selectedLesson !== null && !isSidebarVisible && (
          <button className="expand-sidebar-button" onClick={toggleSidebar}>
            Expand Sidebar
          </button>
        )}

        {/* Lesson Content */}
        <div className={`lesson-content ${selectedLesson ? 'full-width' : ''}`}>
        {selectedLesson ? (
          <div>
            <button className="back-button" onClick={handleBackClick}>Back</button>
            <h2>{selectedLesson}</h2>
            <p>{lessonContent[selectedLesson].text}</p>
            {lessonContent[selectedLesson].image && (
              <div className="lesson-image-container">
                <img
                  src={lessonContent[selectedLesson].image}
                  className="lesson-image"
                />
                <p className="lesson-description">{lessonContent[selectedLesson].description}</p>
                <div className="lesson-buttons">
                  <button className="lesson-button">Try it</button>
                  <button className="lesson-button" onClick={openLevelModal}>Continue</button>
                  <button className="lesson-button" onClick={handleLessonComplete}>Complete Lesson</button>
                  <button className="lesson-button" onClick={handleNextLesson}>Next Lesson</button>
                </div>
              </div>
            )}
            {lessonContent[selectedLesson].video && (
              <div className="lesson-video-container">
                <div className='lesson-video-hold'>
                  <div className="lesson-video-explanation">
                    <video key={selectedLesson} controls className="lesson-video">
                      <source src={lessonContent[selectedLesson].video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    </div>
                    {/* <div className="web-video-explanation"> */}
                    <Example/>
                    {/* </div> */}
                  </div>
                <p className="lesson-description">{lessonContent[selectedLesson].description}</p>
                <div className="lesson-buttons">
                  <button className="lesson-button">Try it</button>
                  <button className="lesson-button" onClick={openLevelModal}>Continue</button>
                  <button className="lesson-button" onClick={handleLessonComplete}>Complete Lesson</button>
                  <button className="lesson-button" onClick={handleNextLesson}>Next Lesson</button>
                </div>
              </div>
            )}
          </div>
        ) :  (
          <p>Pick a lesson to start your adventure and unlock points!</p>
        )}
        </div>
        {/* Modal */}
        {modal.isVisible && (
        <div className="lesson-modal-overlay">
          <div className="lesson-modal">
            <p>{modal.message}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
        )}
      </div>

  
{/* Level Modal */}
{showLevelModal && (
  <div
    className="custom-modal-overlay"
    tabIndex="-1"
    role="dialog"
    aria-modal="true"
  >
    <div className="custom-modal-dialog" role="document">
      <div className="custom-modal-content">
        {/* Modal Header */}
        <div className="custom-modal-header">
          <h5 className="custom-modal-title">Continue Lesson</h5>
        </div>

        {/* Modal Body */}
        <div className="custom-modal-body">
          <p>Are you ready to continue to the next part of the lesson?</p>
          <img
            src="/thumb.gif" 
            alt="Thumbs Up"
            style={{ width: '100px', height: 'auto', display: 'block', margin: '10px auto' }}
          />
        </div>

        {/* Modal Footer */}
        <div className="custom-modal-footer">
          <button
            className="custom-btn custom-btn-primary"
            onClick={closeLevelModal}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default LearningModule;
