import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <div className="Welcome-Content">
          <h1><b>Welcome to the Meet app</b></h1>
          <h5>Log in to see upcoming events around the world for full-stack developers</h5>
          <div className="button_cont" align="center">

            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in" />

              <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" className="btn-text" >
                <b>Sign in with google</b>
              </button>
            </div>
          </div>
          <a href="https://JBradford883.github.io/meetapp/privacy.html" rel="nofollow noopener">Privacy Policy</a>
        </div>
      </div>

    )
    : null
}

export default WelcomeScreen;