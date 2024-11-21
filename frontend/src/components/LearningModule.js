import React, { useState } from 'react';
import '../styles/LearningModule.css';

const LearningModule = () => {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);  // State for sidebar visibility

  const lessons = {
    Beginner: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5'],
    Intermediate: ['Lesson 6', 'Lesson 7', 'Lesson 8', 'Lesson 9', 'Lesson 10'],
    Hard: ['Lesson 11', 'Lesson 12', 'Lesson 13', 'Lesson 14', 'Lesson 15'],
  };

  const lessonContent = {
    'Lesson 1': {
      text: 'A',
      image: '/Aslvid/Alphabet/A.png',
      description: 'How to sign To sign "A" in American Sign Language (ASL), raise your dominant hand in a fist with the palm facing out and extend your thumb.'
    },
    'Lesson 2': {
      text: 'C',
      image: '/Aslvid/Alphabet/C.png',
    },
    'Lesson 3': {
      text: 'E',
      image: '/Aslvid/Alphabet/E.png'
    },
    'Lesson 4': {
      text: 'L',
      image: '/Aslvid/Alphabet/L.png'
    },
    'Lesson 5': {
      text: 'O',
      image: '/Aslvid/Alphabet/O.png'
    },
    'Lesson 6': {
      text: 'Angry',
      video: '/Aslvid/Emotions/Angry.mp4',
      description: 'The sign for "angry" uses a single motion. If you use a double motion and a slightly less intense face it can mean, "grouchy" or "grumpy." Try not to actually touch your face while doing this sign.'
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

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const handleLessonClick = (lesson) => {
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
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleBackClick = () => {
    setSelectedLesson(null);
    setIsSidebarVisible(true);
  };
  return (
    <div className="learning-module-container">
      <h1>Learning Module</h1>
      <div className="content">
        {/* Levels Sidebar */}
        {selectedLesson === null && (
          <div className={`levels-sidebar ${isSidebarVisible ? '' : 'collapsed'}`}>
            {Object.keys(lessons).map((level) => (
              <div className="level" key={level}>
                <button className="level-button" onClick={() => toggleLevel(level)}>
                  {level}
                </button>
                {expandedLevel === level && (
                  <ul className="lesson-list">
                    {lessons[level].map((lesson) => (
                      <li key={lesson} className="lesson-item">
                        <button
                          className="lesson-button"
                          onClick={() => handleLessonClick(lesson)}
                        >
                          {lesson}
                        </button>
                      </li>
                    ))}
                  </ul>
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
                <button className="lesson-button">Try it</button>
              </div>
            )}
            {lessonContent[selectedLesson].video && (
              <div className="lesson-video-container">
                <video key={selectedLesson} controls className="lesson-video">
                  <source src={lessonContent[selectedLesson].video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="lesson-description">{lessonContent[selectedLesson].description}</p>
                <button className="lesson-button">Try it</button>
              </div>
            )}
          </div>
        ) : (
          <p>Pick a lesson to start your adventure and unlock points!</p>
        )}

        </div>
      </div>
    </div>
  );
};

export default LearningModule;
