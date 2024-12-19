/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import '../styles/LearningModule.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import beginnerBadge from '../Badges/beginner.json';
import intermediateBadge from '../Badges/intermediate.json';
import hardBadge from '../Badges/hard.json';
import Webcam from "react-webcam";
import axios from "axios";

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

  const webcamRef = useRef(null);
  const [framesSent, setFramesSent] = useState(0);
  const [prediction, setPrediction] = useState(null);
  const sessionId = "unique_session_id"; // Use a unique identifier per user/session
  const intervalRef = useRef(null); // To store the interval reference
  const [isCapturing, setIsCapturing] = useState(false);

  const startCapture = () => {
    if (!isCapturing) {
      setIsCapturing(true);

      // Start capturing frames
      intervalRef.current = setInterval(() => {
        captureFrame();
      }, 200); // Capture frame every 500ms
    }
  };
  const captureFrame = async () => {
    let modelType='model_1'
    const lessonNum = selectedLesson;
    const selectedLess = lessonNum.split(' ').pop();
    if(selectedLess>3 && selectedLess<=6){
      modelType='model_2'
    }
    else if(selectedLess>6 && selectedLess<=9){
      modelType='model_3'
    }
    else{
      modelType='model_1'
    }

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());

      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");
      formData.append("session_id", sessionId);
      formData.append("model_type", modelType);

      try {
        const response = await axios.post("http://127.0.0.1:8000/api/predict-action/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("API Response:", response.data);

        if (response.data.predicted_action !== undefined) {
          clearInterval(intervalRef.current);  // Stop capturing frames
          console.log("Prediction set:", response.data);
          setPrediction(response.data);
          handleLessonComplete(response.data);
        } else {
          setFramesSent((prev) => prev + 1);  // Increment frame count if not yet predicted
        }
      } catch (error) {
        console.error("Error sending frame:", error);
      }
    }
  };

  const lessons = {
    Beginner: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
    Intermediate: ['Lesson 4', 'Lesson 5', 'Lesson 6'],
    Hard: ['Lesson 7', 'Lesson 8', 'Lesson 9'],
  };

  const lessonContent = {
    'Lesson 1': {
      text: 'Hello',
      video: '/Aslvid/Greetings/Hello.mp4',
      description: 'To sign "Hello," simply raise your hand in front of the camera and give a friendly wave.',
      index: 0
    },
    'Lesson 2': {
      text: 'Good Morning',
      video: '/Aslvid/Greetings/GoodMorning.mp4',
      index: 2
    },
    'Lesson 3': {
      text: 'Bye',
      video: '/Aslvid/Greetings/Bye.mp4',
      index: 1
    },
    'Lesson 4': {
      text: 'Happy',
      video: '/Aslvid/Emotions/Happy.mp4',
      index: 0
    },
    'Lesson 5': {
      text: 'Sad',
      video: '/Aslvid/Emotions/Sad.mp4',
      index: 1
    },
    'Lesson 6': {
      text: 'Surprise',
      video: '/Aslvid/Emotions/Surprise.mp4',
      index:2
    },
    'Lesson 7': {
      text: 'Lets go',
      video: '/Aslvid/Phrases/Help_me.mp4',
      index:0
    },
    'Lesson 8': {
      text: 'Help me',
      video: '/Aslvid/Phrases/Help_me.mp4',
      index: 1
    },
    'Lesson 9': {
      text: 'Whats your name',
      video: '/Aslvid/Phrases/Whats_your_name.mp4',
      index: 2
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

  const handleLessonComplete = async (predictionData) => {
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
      setUserProgress(newProgress);
      if (completed && predictionData.predicted_action==lessonContent[selectedLesson].index) {
        await updateDoc(userRef, { progress: newProgress, points: userData.data().points + pointsToAdd });
        alert("Lesson revisited and 50 points awarded!");
      } else if(predictionData.predicted_action==lessonContent[selectedLesson].index){
        await updateDoc(userRef, { progress: newProgress, points: userData.data().points + pointsToAdd });
        alert("Lesson completed and 100 points awarded!");
      }
      checkAndAwardBadges(newProgress, userRef);
      setIsCapturing(false);
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
// tracks your progress for progressbar
const calculateProgress = (level) => {
  const levelLessons = lessons[level];
  const completedLessons = levelLessons.filter(lesson => userProgress[lesson]?.completed);
  const progress = (completedLessons.length / levelLessons.length) * 100;
  const isComplete = completedLessons.length === levelLessons.length;
  return { progress, isComplete };
}; 

  return (
    <>
      <div className="learning-module-container">
        <h1>Learning Module</h1>
        <div className="content">
          {/* Levels Sidebar */}
          {selectedLesson === null && (
            <div className={`levels-sidebar ${isSidebarVisible ? '' : 'collapsed'}`}>
              {Object.keys(lessons).map((level) => {
                const { progress, isComplete } = calculateProgress(level);
                return (
                  <div className="level" key={level}>
                    <p className="level-button" onClick={() => toggleLevel(level)}>
                      {level}
                      <div className="progress-bar">
                        <div
                          className={`progress-bar-fill ${isComplete ? 'complete' : ''}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
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
                );
              })}
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
                       <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                             {/* <h1>Real-Time Prediction</h1> */}
                             <Webcam
                               ref={webcamRef}
                               screenshotFormat="image/jpeg"
                               style={{ width: "74.5%", maxWidth: "500px",  transform: "scaleX(-1)",WebkitTransform: "scaleX(-1)"}}
                             />
                             {/* <p>Frames Sent: {framesSent}</p> */}
                             {/* {prediction && (
                               <div>
                                 <h2>Prediction</h2>
                                 <p>Action: {prediction.predicted_label}</p>
                                 <p>Confidence: {prediction.confidence.join(", ")}</p>
                               </div>
                             )} */}
                           </div>
                       {/* </div> */}
                     </div>
                   <p className="lesson-description">{lessonContent[selectedLesson].description}</p>
                   <div className="lesson-buttons">
                     {/* <button className="lesson-button">Try it</button> */}
                     {/* <button className="lesson-button" onClick={openLevelModal}>Continue</button>  */}
                     <button className="lesson-button" onClick={startCapture} disabled={isCapturing}>Start</button>
                     <button className="lesson-button" onClick={handleNextLesson}>Next Lesson</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
      </div>
    </>
  );
  
};

export default LearningModule;
