import React, { useRef, useEffect } from "react";
import aslVideo from './Aslvid/Alphabet/Happy.mp4';
import '../styles/LevelPage.css'

function LevelPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
    getVideo();
  }, []);

  return (
    <div className="level-page">
      {/* Centered Title */}
      <h2 className="page-title">Beginner: Lesson 3</h2>

      <div className="video-container">
        <div className="content">
          <p>Practice signing "happy" </p>
          <video src={aslVideo} controls autoPlay loop className="reference-video" />
        </div>

        <div className="video-feed">
        <div className="user-video-container">
          <video ref={videoRef} autoPlay muted className="user-video" />
        </div>
        </div>
      </div>
    
      <button className="continue-button" onClick={() => alert("Continuing to the next level!")}>
          Continue
        </button>
    </div>
  );
}

export default LevelPage;
