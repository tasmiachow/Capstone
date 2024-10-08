import React from 'react'

import { Helmet } from 'react-helmet'

import './create-account-page.css'

const CreateAccountPage = (props) => {
  return (
    <div className="create-account-page-container10">
      <Helmet>
        <title>CreateAccountPage - Homepage convert</title>
        <meta
          property="og:title"
          content="CreateAccountPage - Homepage convert"
        />
      </Helmet>
      <div className="create-account-page-navbar">
        <div className="create-account-page-container11"></div>
        <div className="create-account-page-container12">
          <img
            alt="hands2wordslogo1602"
            src="/external/hands2wordslogo1602-qhel-500h.png"
            className="create-account-page-hands2wordslogo1"
          />
        </div>
        <div className="create-account-page-container13">
          <span className="create-account-page-text10">
            <span>About</span>
          </span>
        </div>
        <div className="create-account-page-container14">
          <span className="create-account-page-text12">
            <span>Login</span>
          </span>
        </div>
        <div className="create-account-page-container15">
          <span className="create-account-page-text14">
            <span>Register</span>
          </span>
        </div>
      </div>
      <div className="create-account-page-container16">
        <div className="create-account-page-container17">
          <div className="create-account-page-container18">
            <div className="create-account-page-container19">
              <span className="create-account-page-text16">
                Create an Account
              </span>
            </div>
          </div>
          <div className="create-account-page-container20">
            <div className="create-account-page-rectangle21">
              <span className="create-account-page-text17">
                <span>Full name</span>
              </span>
            </div>
          </div>
          <div className="create-account-page-container21">
            <div className="create-account-page-rectangle22">
              <span className="create-account-page-text19">Email</span>
            </div>
          </div>
          <div className="create-account-page-container22">
            <div className="create-account-page-rectangle23">
              <span className="create-account-page-text20">
                <span>Password</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="create-account-page-container23">
            <div className="create-account-page-rectangle24">
              <span className="create-account-page-text23">
                <span>Confirm Password</span>
                <br></br>
              </span>
            </div>
          </div>
          <div className="create-account-page-container24">
            <div className="create-account-page-rectangle8">
              <span className="create-account-page-text26">
                <span>Create</span>
              </span>
            </div>
            <span className="create-account-page-text28">
              <span className="create-account-page-text29">
                Already have an account?
              </span>
              <span className="create-account-page-text30">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="create-account-page-text31">Sign in</span>
            </span>
            <span className="create-account-page-text32">Skip now --&gt;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAccountPage
