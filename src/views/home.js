import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container10">
      <Helmet>
        <title>Hands2Words</title>
        <meta property="og:title" content="Hands2Words" />
      </Helmet>
      <div className="home-container11">
        <div className="home-container12"></div>
        <div className="home-container13">
          <img
            alt="hands2wordslogo1602"
            src="/external/hands2wordslogo1602-qhel-500h.png"
            className="home-hands2wordslogo1"
          />
        </div>
        <div className="home-container14">
          <span className="home-text10">
            <span>About</span>
          </span>
        </div>
        <div className="home-container15">
          <span className="home-text12">
            <span>Login</span>
          </span>
        </div>
        <div className="home-container16">
          <span className="home-text14">
            <span>Register</span>
          </span>
        </div>
      </div>
      <div className="home-container17">
        <div className="home-container18">
          <img
            alt="image21322"
            src="/external/image21322-lplr-600w.png"
            className="home-image2"
          />
          <div className="home-container19">
            <span className="home-text16">
              <span>Translate ASL to English in real-time.</span>
            </span>
            <span className="home-text18">
              <span>
                How? Allow your camera, make the
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <br></br>
              <span>ASL gestures, and select frames to translate!</span>
            </span>
          </div>
          <div className="home-container20">
            <div className="home-startbutton">
              <span className="home-text22">
                <span>Get Started</span>
              </span>
            </div>
            <div className="home-guestbutton">
              <span className="home-text24">
                <span>Translate as Guest</span>
              </span>
            </div>
          </div>
          <div className="home-container21">
            <img
              alt="hands2words316"
              src="/external/hands2words316-l9xj-200h.png"
              className="home-hands2words"
            />
            <span className="home-text26">Where every sign speaks</span>
          </div>
        </div>
        <span className="home-text27">
          <span>
            This project aims to develop a web application that processes live
            video streams of sign language gestures and translates them into
            text in real time.
          </span>
          <br></br>
          <span></span>
        </span>
      </div>
    </div>
  )
}

export default Home
