import React from 'react'

import { Helmet } from 'react-helmet'

import './login-page.css'

const LoginPage = (props) => {
  return (
    <div className="login-page-container10">
      <Helmet>
        <title>LoginPage - Hands2Words</title>
        <meta property="og:title" content="LoginPage - Hands2Words" />
      </Helmet>
      <div className="login-page-navbar">
        <div className="login-page-container11"></div>
        <div className="login-page-container12">
          <img
            alt="hands2wordslogo1602"
            src="/external/hands2wordslogo1602-qhel-500h.png"
            className="login-page-hands2wordslogo1"
          />
        </div>
        <div className="login-page-container13">
          <span className="login-page-text10">
            <span>About</span>
          </span>
        </div>
        <div className="login-page-container14">
          <span className="login-page-text12">
            <span>Login</span>
          </span>
        </div>
        <div className="login-page-container15">
          <span className="login-page-text14">
            <span>Register</span>
          </span>
        </div>
      </div>
      <div className="login-page-container16">
        <div className="login-page-container17"></div>
        <div className="login-page-container18">
          <div className="login-page-container19">
            <div className="login-page-thumbuminremovebgpreview1"></div>
            <span className="login-page-text16">
              <span>Login to your Account</span>
            </span>
          </div>
          <div className="login-page-container20">
            <img
              src="/external/rectangle2411-w7ip-200h.png"
              alt="Rectangle2411"
              className="login-page-rectangle21"
            />
            <span className="login-page-text18">
              <span>Username or email</span>
            </span>
          </div>
          <div className="login-page-container21">
            <img
              src="/external/rectangle2411-w7ip-200h.png"
              alt="Rectangle2411"
              className="login-page-rectangle22"
            />
            <span className="login-page-text20">
              <span>Password</span>
              <br></br>
              <br></br>
            </span>
            <span className="login-page-text24">
              <span>Forgot Password</span>
            </span>
          </div>
          <div className="login-page-container22">
            <div className="login-page-rectangle8">
              <span className="login-page-text26">Login</span>
            </div>
            <div className="login-page-container23">
              <span className="login-page-text27">
                <span>Don’t have an account? </span>
                <span className="login-page-text29">Create one</span>
              </span>
            </div>
            <span className="login-page-text30">
              <span>Skip now --&gt;</span>
            </span>
          </div>
        </div>
        <div className="login-page-container24">
          <img
            src="/external/hands128-68aa-600h.png"
            alt="Hands128"
            className="login-page-hands1"
          />
          <img
            src="/external/giphy21523-ntp-600w.png"
            alt="giphy21523"
            className="login-page-giphy21"
          />
          <span className="login-page-text32">
            <span>Where Every Sign Speaks</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
