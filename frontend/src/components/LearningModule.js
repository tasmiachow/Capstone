import React, { useState } from 'react';
import '../styles/LearningModule.css';

const LearningModule = () => {
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const lessons = {
    beginner: ['Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4', 'Lesson 5'],
    intermediate: ['Lesson 6', 'Lesson 7', 'Lesson 8', 'Lesson 9', 'Lesson 10'],
    hard: ['Lesson 11', 'Lesson 12', 'Lesson 13', 'Lesson 14', 'Lesson 15'],
  };

  const lessonContent = {
    'Lesson 1': 'A',
    'Lesson 2': 'Content for Lesson 2',
    'Lesson 3': 'Content for Lesson 3',
    'Lesson 4': 'Content for Lesson 4',
    'Lesson 5': 'Content for Lesson 5',
    // Add more lesson content here
  };

  const toggleLevel = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="learning-module-container">
      <h1 className="module-title">Learning Module</h1>
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
              <p>{lessonContent[selectedLesson]}</p>
            </div>
          ) : (
            <p>Please select a lesson to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningModule;
