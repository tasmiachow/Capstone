import React, { useState } from 'react';
import '../styles/LearningModule.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LearningModule = () => {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLevelModal, setShowLevelModal] = useState(false);

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
    setSelectedLesson(lesson);
  };
  const openLevelModal = () => {
    setShowLevelModal(true);
  };

  const closeLevelModal = () => {
    setShowLevelModal(false);
  };

  return (
    <div className="learning-module-container">
      <h1>Learning Module</h1>
      <div className="content">
        <div className="levels-sidebar">
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

        <div className="lesson-content">
          {selectedLesson ? (
            <div>
              <h2>{selectedLesson}</h2>
              <p>{lessonContent[selectedLesson].text}</p>
              {lessonContent[selectedLesson].image && (
                <div className="lesson-image-container">
                  <img
                    src={lessonContent[selectedLesson].image}
                    alt={`${selectedLesson}`}
                    className="lesson-image"
                  />
                  <p className="lesson-description">{lessonContent[selectedLesson].description}</p>
                  <button className="lesson-button">Try it</button>
                  <button className="lesson-button" onClick={openLevelModal}>Continue</button>
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
                  <button className="lesson-button" onClick={openLevelModal}>Continue</button>
                </div>
              )}
            </div>
          ) : (
            <p>Pick a lesson to start your adventure and unlock points!</p>
          )}
        </div>
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
