import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="text-container">
        <h1>Dive into ASL and express Yourself Beyond Words</h1>
        <p>
          How? Allow your camera, start working on the lessons, and make ASL gestures!
        </p>
        <Link to="/modules">
          <button className="start-button">Get started</button>
        </Link>
      </div>
      <div className="gif-container">
        <img src="/handigif.gif" alt="Learning GIF" className="learning-gif" />
      </div>
    </div>
  );
}

export default Home;
