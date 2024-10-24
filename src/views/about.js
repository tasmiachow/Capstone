import React from 'react'

import { Helmet } from 'react-helmet'

import './about.css'

const About = (props) => {
  return (
    <div className="about-container10">
      <Helmet>
        <title>About - Hands2Words</title>
        <meta property="og:title" content="About - Hands2Words" />
      </Helmet>
      <div className="about-container11">
        <div className="about-container12"></div>
        <div className="about-container13">
          <img
            alt="hands2wordslogo1602"
            src="/external/hands2wordslogo1602-qhel-500h.png"
            className="about-hands2wordslogo1"
          />
        </div>
        <div className="about-container14">
          <span className="about-text10">
            <span>About</span>
          </span>
        </div>
        <div className="about-container15">
          <span className="about-text12">
            <span>Login</span>
          </span>
        </div>
        <div className="about-container16">
          <span className="about-text14">
            <span>Register</span>
          </span>
        </div>
      </div>
      <div className="about-container17">
        <div className="about-container18">
          <div className="about-container19">
            <img
              alt="hands2words316"
              src="/external/hands2words316-l9xj-200h.png"
              className="about-hands2words"
            />
            <span className="about-text16">Where every sign speaks</span>
          </div>
          <div className="about-container20">
            <div className="about-startbutton">
              <div className="about-container21">
                <span className="about-text17">About</span>
              </div>
              <div className="about-container22">
                <span className="about-text18">
                  <span>
                    This project aims to develop a web application that
                    processes live video streams of sign language gestures and
                    translates them into text in real time.
                  </span>
                  <br></br>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
